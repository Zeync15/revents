import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router";
import { listenToSelectedEvent } from "../eventActions";

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const event = useSelector((state) => state.event.selectedEvent);
  const { loading, error } = useSelector((state) => state.async);
  const isHost = event?.hostUid === currentUser?.uid;
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSideBar
          attendees={event?.attendees}
          hostUid={event.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
}

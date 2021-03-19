import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function TestModal({ data }) {
  return (
    <ModalWrapper size='mini' header='Test Modal'>
      <h3>The data is: {data}</h3>
    </ModalWrapper>
  );
}

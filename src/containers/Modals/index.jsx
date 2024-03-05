import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { confirmable } from "react-confirm";

function confirmModal({ show, proceed, confirmation, options }) {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog onHide={() => proceed(false)} show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{confirmation}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => proceed(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => proceed(true)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default confirmable(confirmModal);

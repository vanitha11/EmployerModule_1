import React from "react";
import { Modal, Button } from "react-bootstrap";

export default (props) => {
  let show = props.showDelete;
  let handleClose = props.handleDeleteClose;

  return (
      <>
    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
            Are you sure you want to delete the location?
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

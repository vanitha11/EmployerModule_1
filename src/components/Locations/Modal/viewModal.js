import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./modal.css";

export default (props) => {
  let show = props.show;
  let handleClose = props.handleClose;
  let contactList = props.contactList;

  return (
      <>
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header class="button" closeButton>
        <Modal.Title>Contacts</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div class="panel panel-primary">
          <div class="tab-menu-heading tab-menu-heading-boxed">
            <div class="tabs-menu-boxed">
              <ul class="nav panel-tabs">
                <li>
                  <a href="#tab25" class="active" data-bs-toggle="tab">
                    Contact List
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="panel-body tabs-menu-body">
            <div class="tab-content">
              <div class="tab-pane active" id="tab25">
                <div class="col-xl-14">
                  <div class="card">
                    <div class="card-body">
                      <div class="card-body">
                        <div class="row">
                          <div class="table-responsive">
                            <table class="table border text-nowrap text-md-nowrap table-hover mb-0">
                              <thead>
                                <tr>
                                  <th>S.No</th>

                                  <th>Name</th>
                                  <th>Employee ID</th>
                                  <th>Cell Phone #</th>
                                  <th>Work Phone #</th>
                                  <th>Email address</th>
                                </tr>
                              </thead>
                              <tbody>
                                {contactList.map((item) => {
                                  return (
                                    <tr>
                                      <td>1</td>

                                      <td>{item.firstName}</td>
                                      <td>{item.employeeId}</td>
                                      <td>{item.cellPhoneNumber}</td>
                                      <td>{item.workNumber}</td>
                                      <td>{item.email}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

import React, { useEffect, useState } from "react";

export default (props) => {
    let contactList = props.contactList;
    
    return (
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
                              {contactList ? contactList.map((item, index) => {
                                  return (
                                    <tr>
                                      <td>{index +1}</td>

                                      <td>{item.firstName}</td>
                                      <td>{item.employeeId}</td>
                                      <td>{item.cellPhoneNumber}</td>
                                      <td>{item.workNumber}</td>
                                      <td>{item.email}</td>
                                    </tr>
                                  );
                                }) : 
                                    
                                        <div class="contact"><span>No Contacts</span></div>
                                    
                                }
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
    )
}
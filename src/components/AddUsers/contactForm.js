import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import './addUsers.css';

export default (props) => {
  const userDetails = props.userDetails

  const [locationName, setLocationName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [workNumber, setWorkNumber] = useState('');

  useEffect(() => {
    if(userDetails) {
      setLocationName(userDetails.locationName);
      setFirstName(userDetails.firstName);
      setLastName(userDetails.lastName);
      setEmail(userDetails.email);
      setUserType(userDetails.userType);
      setCellNumber(userDetails.cellPhoneNumber);
      setWorkNumber(userDetails.workNumber);
      setEmployeeId(userDetails.employeeId)
    }
}, [userDetails]);

  const locationsName = [
    "Florida University Hospital",
    "Florida NorthWest Hospital",
    "Chennai DBSS 1001"
  ]

  const userTypes = [
    {
      value: "SDU",
      label:"Super Duper User"
    },
    {
      value: "SU",
      label:"Super User"
    },
    {
      value: "User",
      label:"User"
    }
  ]

  const onChangeHandler = (e) => {
    const locname = e.target.value;
    setLocationName(locname);
  }

  return (
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="tab25">
          <div class="col-xl-14" id="userForm">
              <Form autoComplete="off" noValidate>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="location">
                      <Form.Label>Location name*</Form.Label>
                      <Form.Select value={locationName} onChange={(e) => onChangeHandler(e)}>
                        <option value="">--Select--</option>
                        {locationsName.map((area, n) => (
                          <option key={`traveldistance_${n}`} value={area}>
                            {area}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="FirstName">
                      <Form.Label>First Name*</Form.Label>
                      <Form.Control type="text" placeholder="Street" value={firstName} />
                    </Form.Group>
                    <Form.Group as={Col} className="md-4" controlId="Email">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control type="text" placeholder="Email" value={email}/>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="LastName">
                      <Form.Label>Last Name*</Form.Label>
                      <Form.Control type="text" placeholder="LastName" value={lastName}/>
                    </Form.Group> 
                    <Form.Group as={Col} className="md-4" controlId="Password">
                      <Form.Label>Password*</Form.Label>
                      <Form.Control type="password" placeholder="Street"value={password} />
                    </Form.Group>
                    
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="employeeId">
                      <Form.Label>Employee ID*</Form.Label>
                      <Form.Control type="text" placeholder="Employee ID" value={employeeId}/>
                    </Form.Group>
                    <Form.Group  as={Col} className="mb-2" controlId="confirmPassword">
                      <Form.Label>Confirm Password*</Form.Label>
                      <Form.Control type="password" placeholder="Street" value={confirmPassword} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="mb-2" controlId="userType">
                      <Form.Label>User Type*</Form.Label>
                      <Form.Select value={userType}>
                        <option value="">--Select--</option>
                        {userTypes.map((area, n) => (
                          <option key={`userType${n}`} value={area.value}>
                            {area.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}  className="mb-2" controlId="checkApproval">
                      <Form.Label></Form.Label>
                      <Form.Check type="checkbox" label="Location Approval User" />
                    </Form.Group>
                    <Form.Group  as={Col} className="mb-2" controlId="checkContact">
                      <Form.Label></Form.Label>
                      <Form.Check type="checkbox" label="Location Contact User" />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="cellnumber">
                      <Form.Label>Cell #*</Form.Label>
                      <Form.Control type="text" placeholder="Cell Phone" value={cellNumber}/>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="worknumber">
                      <Form.Label>Work #*</Form.Label>
                      <Form.Control type="text" placeholder="Work Phone" value={workNumber}/>
                    </Form.Group>
                  </Row>
                </Form>

            <div class="card-footer text-end formButton">
              <button class="btn btn-success my-1">
                Save
              </button>
              <button class="btn btn-danger my-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

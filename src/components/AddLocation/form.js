import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { FiTrash2 } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import "./addLocation.css";

export default (props) => {
  const [emrSystemList, setEmrSystemList] = useState([{ emrSystem: "" }]);
  const locationDetails = props.locationDetails;

  const [locationName, setLocationName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    if(locationDetails) {
      setLocationName(locationDetails.locationName);
      setStreetAddress(locationDetails.streetAddress);
      setZipcode(locationDetails.zipcode);
      setCity(locationDetails.city);
      setStateName(locationDetails.stateName);
      setPhoneNumber(locationDetails.phoneNumber);
      setTimeZone(locationDetails.timezone)
    }
}, [locationDetails]);

  console.log(emrSystemList);

  const traveldistance = [
    "Up To 10 miles",
    "Up To 20 miles",
    "Up To 30 miles",
    "Up To 40 miles",
    "Up To 50 miles",
    "Up To 60 miles",
    "Up To 70 miles",
    "Up To 80 miles",
    "Up To 90 miles",
    "Up To 100 miles",
    ">100 miles",
  ];

  const timezone = [
    "America/Detroit",
    "America/Los_Angeles",
    "America/Kentucky/Louisville",
    "America/Indiana/Marengo",
    "Pacific/Majuro",
    "America/Indiana/Vincennes",
    "America/Phoenix",
    "America/Indiana/Petersburg",
    "America/Indiana/Winamac",
    "Pacific/Pago_Pago",
    "Eastern Standard Time"
  ];

  const emrSystems = [
    {
      value: "Advanced MD",
      label: "Advanced MD",
    },
    {
      value: "Allscripts",
      label: "Allscripts",
    },
    {
      value: "Athenahealth",
      label: "Athenahealth",
    },
    {
      value: "Care Cloud",
      label: "Care Cloud",
    },
    {
      value: "Centricity",
      label: "Centricity",
    },
    {
      value: "Cerner",
      label: "Cerner",
    },
    {
      value: "Charm EHR",
      label: "Charm EHR",
    },
    {
      value: "Chart Logic",
      label: "Chart Logic",
    },
  ];

  const handleSystemAdd = () => {
    setEmrSystemList([...emrSystemList, { emrSystem: "" }]);
  };

  const handleSystemRemove = (index) => {
    const list = [...emrSystemList];
    list.splice(index, 1);
    setEmrSystemList(list);
  };

  const handleSystemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...emrSystemList];
    list[index][name] = value;
    setEmrSystemList(list);
  };

  return (
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="tab25">
          <div class="col-xl-14">
            <div class="card">
              <div class="card-body">
                <Form autoComplete="off" noValidate>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="locationName">
                      <Form.Label>Location name*</Form.Label>
                      <Form.Control type="text" placeholder="Location name" value={locationName} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="Street">
                      <Form.Label>Street*</Form.Label>
                      <Form.Control type="text" placeholder="Street" value={streetAddress} />
                    </Form.Group>
                    <Form.Group as={Col} className="md-4" controlId="ZipCode">
                      <Form.Label>Zip*</Form.Label>
                      <Form.Control type="text" placeholder="ZipCode" value={zipcode} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="City">
                      <Form.Label>City*</Form.Label>
                      <Form.Control type="text" placeholder="City" value={city} />
                    </Form.Group>
                    <Form.Group as={Col} className="md-4" controlId="State">
                      <Form.Label>State*</Form.Label>
                      <Form.Control type="text" placeholder="State" value={stateName} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="Phone">
                      <Form.Label>Phone*</Form.Label>
                      <Form.Control type="text" placeholder="Phone" value={phoneNumber} />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="md-4"
                      controlId="travelDistance"
                    >
                      <Form.Label>Acceptable Travel Distance*</Form.Label>
                      <Form.Select>
                        <option value="">--Select--</option>
                        {traveldistance.map((area, n) => (
                          <option key={`traveldistance_${n}`} value={area}>
                            {area}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="timezone">
                      <Form.Label>Time Zone*</Form.Label>
                      <Form.Select style={{ width: "49%" }} value={timeZone}>
                        <option value="">--Select--</option>
                        {timezone.map((area, n) => (
                          <option key={`timezone_${n}`} value={area}>
                            {area}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </div>

            <div class="card">
              <div class="col-lg-12 col-md-12">
                <div class="row">
                  <div class="card-header">
                    <div class="col-lg-12 col-md-12">
                      <h4>EMR/EHR System Experience*</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="col-lg-12 col-md-12">
                      <label class="form-label">Select EMR/EHR System</label>
                      <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={emrSystems}
                      />
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="col-lg-12 col-md-12">
                      <div class="row">
                        <div
                          class="col-lg-12 col-md-12"
                          id="divAddEMREHRSystem"
                        >
                          <div class="row" id="">
                            <label class="form-label">
                              Other EMR/EHR System experience
                            </label>
                            {emrSystemList.map((singleSystem, index) => (
                              <div class="emrsystem">
                                <div class="firstDivision">
                                  <input
                                    name="emrSystem"
                                    type="text"
                                    class="form-control"
                                    id="othercertifyname"
                                    placeholder="List EMR/EHR System"
                                    value={singleSystem.emrSystem}
                                    onChange={(e) =>
                                      handleSystemChange(e, index)
                                    }
                                  />
                                  {emrSystemList.length - 1 === index && (
                                    <button
                                      id="bDel"
                                      type="button"
                                      title="Delete"
                                      style={{ "font-size": "1rem" }}
                                      onClick={handleSystemAdd}
                                    >
                                      <FiPlusCircle /> Add new
                                    </button>
                                  )}
                                </div>
                                <div className="secondDivision">
                                  {emrSystemList.length > 1 && (
                                    <button
                                      type="button"
                                      className="remove-btn"
                                      style={{ "font-size": "1rem" }}
                                      onClick={() => handleSystemRemove(index)}
                                    >
                                      <FiTrash2 />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer text-end formButton">
              <button class="btn btn-success my-1">
                Save
              </button>
              <button class="btn btn-success my-1">
                Save and Add Contact
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

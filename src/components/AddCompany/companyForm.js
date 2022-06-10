import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getZipCodeInfo, saveCompanyInfo} from './endpoints/action';
import {companySelector} from "./endpoints/selector";
import useConfiguration from "../../hooks/useConfiguration";

export default () => {
  const config = useConfiguration();
  const [form, setForm] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState([]);
  const {zipCodeInfo} = useSelector(companySelector);
  const dispatch = useDispatch();
  console.log(zipCodeInfo);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    if(!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }

  const clearFields = () => {
    setForm({});
  }

    const timezones = [
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
        "Eastern Daylight Time"
      ];

  useEffect(() => {
    if(form.zipcode && form.zipcode.length === 5)
      dispatch(getZipCodeInfo(config.baseUrl, form.zipcode));
  }, [form.zipcode && form.zipcode.length === 5]);

  useEffect(() => {
    if(zipCodeInfo)
    setForm({
      ...form,
      stateName: zipCodeInfo.state,
      city: zipCodeInfo.city,
      timezone: zipCodeInfo.timeZone
    })
    setIsDisabled(true);
  }, [zipCodeInfo]);

  const validateForm = () => {
    const {companyName, streetAddress, zipcode, stateName, city, phoneNumber, timezone} = form;
    const newErrors = {};
    const phoneno = /^\d{10}$/;
    if(!companyName || companyName === '') newErrors.companyName = "Please enter the company name"
    if(!streetAddress || streetAddress === '') newErrors.streetAddress = "Please enter the street Address"
    if(!zipcode || zipcode === '') newErrors.zipcode = "Please enter the Zip Code"
    if(!stateName || stateName === '') newErrors.stateName = "Please enter the State"
    if(!city || city === '') newErrors.city = "Please enter the City"
    if(!phoneNumber || phoneNumber === '') {
      newErrors.phoneNumber = "Please enter the Phone number"
    } else if(!phoneNumber.match(phoneno)) {
      newErrors.phoneNumber = "Phone number should be a 10 digit number"
    }
    if(!timezone || timezone === '') newErrors.timezone = "Please enter the TimeZone"
    return newErrors
  }

  const validateAndSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log(form);
      dispatch(saveCompanyInfo(config.baseUrl, form));
    }

  }

  return (
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="tab25">
          <div class="col-xl-14" id="companyForm">
              <Form autoComplete="off" noValidate onSubmit={validateAndSubmit}>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="companyName">
                      <Form.Label>Main Company Name*</Form.Label>
                      <Form.Control type="text" 
                        value={form.companyName}
                        onChange={e => {
                          setField('companyName', e.currentTarget.value)
                        }}
                        placeholder="Main Company Name" 
                        isInvalid={!!errors.companyName}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.companyName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="streetAddress">
                      <Form.Label>Street*</Form.Label>
                      <Form.Control type="text" 
                        value={form.streetAddress}
                        onChange={e => {
                          setField('streetAddress', e.currentTarget.value)
                        }}
                        placeholder="Street" 
                        isInvalid={!!errors.streetAddress}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.streetAddress}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} className="md-4" controlId="zipcode">
                      <Form.Label>Zip*</Form.Label>
                      <Form.Control type="text"
                         value={form.zipcode}
                         onChange={e => {
                          setField('zipcode', e.currentTarget.value)
                         }}
                      placeholder="ZipCode" 
                      isInvalid={!!errors.zipcode}/>
                    <Form.Control.Feedback type="invalid">
                        {errors.zipcode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="city">
                      <Form.Label>City*</Form.Label>
                      <Form.Control type="text" 
                         value={form.city}
                         disabled={isDisabled}
                         onChange={e => {
                          setField('city', e.currentTarget.value)
                         }}
                        placeholder="City" 
                        isInvalid={!!errors.city}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group as={Col} className="md-4" controlId="stateName">
                      <Form.Label>State*</Form.Label>
                      <Form.Control type="text" 
                        value={form.stateName}
                        disabled={isDisabled}
                        onChange={e => {
                          setField('stateName', e.currentTarget.value)
                        }}
                        placeholder="State" 
                        isInvalid={!!errors.stateName}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.stateName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="phoneNumber">
                      <Form.Label>Phone*</Form.Label>
                      <Form.Control type="text" 
                        value={form.phoneNumber}
                        onChange={e => {
                          setField('phoneNumber', e.currentTarget.value)
                        }}
                        placeholder="Phone" 
                        isInvalid={!!errors.phoneNumber} />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="md-4" controlId="timezone">
                      <Form.Label>Time Zone*</Form.Label>
                      <Form.Select 
                        value={form.timezone}
                        onChange={e => {
                          setField('timezone', e.currentTarget.value)
                        }}>
                        <option value="">--Select--</option>
                        {timezones.map((area, n) => (
                          <option key={`timezone_${n}`} value={area}>
                            {area}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <div class="card-footer text-end formButton">
                    <Button class="btn btn-success my-1" type="Submit">
                      Save
                    </Button>
                    <Button class="btn btn-danger my-1" type="Submit" onClick={clearFields}>
                      Cancel
                    </Button>
                  </div>
                </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

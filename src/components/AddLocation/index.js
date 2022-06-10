import React, {useEffect, useState} from "react";
import Footer from "../common/Footer";
import { Button, Col, Form, Row } from 'react-bootstrap';
import LocationForm from "./form";
import Contacts from './contacts';
import { useLocation, useNavigate } from "react-router-dom";
import "./addLocation.css";

export default () => {
    const navigate = useNavigate();
    const [showContacts, setShowContacts] = useState(false);
    const [hideContacts, sethideContacts] = useState(false);
    const location = useLocation();
    const { contacts, contactList, name, locationDetails, hideContact } = location.state;
    console.log(locationDetails);

    console.log(contactList);

    useEffect(() => {
        if(contacts === "true") {
            setShowContacts(true)
        } else {
            setShowContacts(false)
        }
    }, [contacts]); 

    useEffect(() => {
        if(hideContact) {
            sethideContacts(true)
        } else {
            sethideContacts(false)
        }
    }, [hideContact]); 

    const addNewContact = () => {
        navigate("/adduser", 
        {
            state: {
                contacts: true
            }
        })
    }
    

    return (
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header headerMargin">

                                <h1 className="page-title">Locations</h1>

                                <div>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Add Location</li>
                                    </ol>
                                </div>
                            </div>
                            <div class="locationName-margin">
                                <span class="locationName">{name? name : 'Add New'}</span>
                            </div>
                            <div className="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="panel panel-primary">
                                                <div class="tab-menu-heading tab-menu-heading-boxed">
                                                    <div class="tabs-menu-boxed">
                                                        <ul class="nav panel-tabs">
                                                            <li><a href="#tab25" className={!showContacts? 'active' : ''} data-bs-toggle="tab" onClick={() => setShowContacts(false)}>Details</a></li>
                                                            {!hideContacts && <li><a href="#tab26" className={showContacts? 'active' : ''} data-bs-toggle="tab" onClick={() => setShowContacts(true)}>Contacts</a></li>}
                                                        </ul>
                                                        {showContacts && <div class="newLocation">
                                                            <button class="btn btn-success" onClick={addNewContact}>Add New Contact</button>
                                                        </div>}
                                                        
                                                    </div>
                                                </div>
                                                {!showContacts && <LocationForm locationDetails={locationDetails} />}
                                                {showContacts && <Contacts contactList={contactList} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
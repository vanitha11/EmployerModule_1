import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getLocationDropdownList} from './endpoints/action';
import {addUserSelector} from "./endpoints/selector";
import Footer from "../common/Footer";
import ContactForm from './contactForm';
import { useLocation } from "react-router-dom";
import useConfiguration from "../../hooks/useConfiguration";

export default () => {
    const location = useLocation();
    const { contacts, editUser, userDetails, name } = location.state;
    const config = useConfiguration();
    const {locationDropdownList} = useSelector(addUserSelector);
    const dispatch = useDispatch();
    console.log(locationDropdownList);

    useEffect(() => {
        if(config.baseUrl)
            dispatch(getLocationDropdownList(config.baseUrl));
    }, [config]);

    

    console.log(userDetails);

    return(
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header">
                                {contacts && <h1 className="page-title">Add Contact</h1>}
                                {editUser !== undefined && <h1 className="page-title">{editUser?'Edit User' : 'Add user'}</h1>}
                                <div>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Add Contact</li>
                                </ol>
                            </div>
                            </div>
                            <div className="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="panel panel-primary">
                                                <ContactForm userDetails={userDetails} />

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
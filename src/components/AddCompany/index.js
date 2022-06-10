import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import Footer from "../common/Footer";
import {getTimeZoneDropdownList} from './endpoints/action';
import {companySelector} from "./endpoints/selector";
import CompanyForm from './companyForm';
import useConfiguration from "../../hooks/useConfiguration";
import './addCompany.css';

export default () => {
    const config = useConfiguration();
    const {timezoneDropdownList} = useSelector(companySelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if(config.baseUrl)
            dispatch(getTimeZoneDropdownList(config.baseUrl));
    }, [config]); 

    return(
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header">
                                <h1 className="page-title">Add Company</h1>
                                <div>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Add Company</li>
                                </ol>
                            </div>
                            </div>
                            <div className="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="panel panel-primary">
                                                <CompanyForm />
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
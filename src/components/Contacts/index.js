import React, {useEffect, useState} from "react";
import Footer from "../common/Footer";
import ContactList from './contactList';

export default () => {
    
    return (
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header headerMargin">

                                <h1 className="page-title">Contacts</h1>

                                <div>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Contacts</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="panel panel-primary">
                                                <div class="tab-menu-heading tab-menu-heading-boxed">
                                                    <div class="tabs-menu-boxed">
                                                        <ul class="nav panel-tabs">
                                                            <li><a href="#tab25" class="active" data-bs-toggle="tab">Contact List</a></li>
                                                        </ul>                                                       
                                                    </div>
                                                </div>
                                                <ContactList />
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
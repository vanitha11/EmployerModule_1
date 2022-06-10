import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {gotoTab} from "../ProfileBuilder/action";
import {useNavigate} from "react-router-dom";

export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Save Success";
    }, []);
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="modal d-block pos-static">
                            <div className="container-login100">
                                <div className="wrap-login100 p-6">
                                    <form className="login100-form validate-form">
                                    <span className="login100-form-title pb-5">
                                        <a href=""><img src="assets/images/brand/logo-3.png"
                                                        className="header-brand-img" alt=""/></a>
                                    </span>
                                        <div className="">
                                            <div className="modal-body text-center p-4 pb-5">
                                                <i className="icon icon-check fs-70 text-success lh-1 my-4 d-inline-block"></i>
                                                <h4 className="text-success mb-4">
                                                    Thank you for your submission
                                                </h4>
                                                <p className="mb-4">
                                                </p><h4>
                                                You are now part of the Overture Candidate Group. <br/>
                                                You are now eligible to be contacted by employers who use Overture <br/>
                                                for interviews, credentialing, and shift opportunities.
                                            </h4>
                                                <p></p>
                                                <a className="btn btn-success pd-x-25" href="#" onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(gotoTab('personalInfo'));
                                                    navigate('/dashboard');
                                                }}>OK</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import Loader from "../common/Loader";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {logOut} from "../Login/action";

import {useSelector, useDispatch} from "react-redux";
import useConfiguration from "../../hooks/useConfiguration";
import useSessionStorage from "../../hooks/useSessionStorage";
import {dashboardSelector} from "../Dashboard/selector";
import EditEmail from "./editEmail";
import useValidation from "../../hooks/useValidation";
import './account.css';
import requestUtil from "../../helpers/requestUtil";
import {setLoadingPageFalse, setLoadingPageTrue} from "../common/Loader/action";
import Error from "../common/Message/error";

export default () => {
    const [changeEmail, setChangeEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [registrationErrors, setRegistrationErrors] = useState({});
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const config = useConfiguration();
    const storage = useSessionStorage();
    const dispatch = useDispatch();
    const validate = useValidation();
    const login = storage.getItem("login");
    const { data } = useSelector(dashboardSelector);
    const navigate = useNavigate();
    
    useEffect(() =>{
        document.title="Overture Account";
        
    }, [config]);
    const deactivateAccount = (event) => {
        event.preventDefault();
        dispatch(setLoadingPageTrue());
        requestUtil(`${config.baseUrl}/Candidates/deactivate/${login.candidateId}`, 'POST').then(response => {
            dispatch(logOut()).then(() => {
                    dispatch(setLoadingPageFalse());
                    navigate("/")
                    window.location.reload();
                }
            );
        }).catch(error => {
            dispatch(setLoadingPageFalse());
            setErrorMessage(error.message);
        });
    }
    const deleteAccount = (event) => {
        event.preventDefault();
        dispatch(setLoadingPageTrue());
        requestUtil(`${config.baseUrl}/Candidates/deleteaccount/${login.candidateId}`, 'POST').then(response => {
            dispatch(logOut()).then(() => {
                    dispatch(setLoadingPageFalse());
                    navigate("/");
                    window.location.reload();
                }
            );
        }).catch(error => {
            dispatch(setLoadingPageFalse());
            setErrorMessage(error.message);
        });
    }
    const editEmail = (event) => {
        event.preventDefault();
        setChangeEmail(!changeEmail);
        setNewEmail('');
        setErrorMessage('');
        setMessage('');
    }
    const updateEmail = (target) => {
        setNewEmail(target.value);
    }
    const validateEmail = () => {
        const result = validate("updateEmail", [{'name': 'email', data: newEmail}]);
        if (result.valid) {
            setFormErrors({});
        } else {
            setFormErrors(result.errors);
        }
        if(newEmail===data.email) {
            setFormErrors({"email": ['New email should not be same as old email']});
            return false;
        }
        return result.valid;
    }
    const saveEmail = (event) => {
        event.preventDefault();
        if(validateEmail()){
            dispatch(setLoadingPageTrue());
            requestUtil(`${config.baseUrl}/Candidates/updateemailid`, "POST", {
                candidateId: login.candidateId,
                oldEmailId: login.email,
                newEmailId: newEmail
            }).then(response => {
                setMessage(response.message);
                requestUtil(`${config.baseUrl}/Candidates/sendmail-for-changeemailid`, "POST", {
                    candidateId: login.candidateId,
                    oldEmailId: login.email,
                    newEmailId: newEmail
                }).catch(error => {
                    setErrorMessage(error.message || "Failed to send email");
                    dispatch(setLoadingPageFalse());
                })
            }).catch(error => {
                setErrorMessage(error.message || "Failed to update email");
                dispatch(setLoadingPageFalse());
            });
        }
    }
    const validatePersonalInfo = () => {
        const keys = Object.keys(data);
        const registrationResult = validate("personalInfo", keys.map(key => {
            return {
                name: key, data: data[key]
            }
        }));
        if (registrationResult.valid) {
            setRegistrationErrors({});
        } else {
            setRegistrationErrors(registrationResult.errors);
        }
        return registrationResult.valid;
    }
    const savePersonalInfo = () => {
        if(validatePersonalInfo()){
            dispatch(setLoadingPageTrue());
            requestUtil(`${config.baseUrl}/Candidates/savemyaccountinfo`, "POST", {
                candidateId: login.candidateId,
                ...data
            }).then(response => {
                setMessage(response.message);
                setLoadingPageFalse();
               
            }).catch(error => {
                setErrorMessage(error.message || "Failed to update personal info");
                dispatch(setLoadingPageFalse());
            });
        }
    }
    const cancelEdit = () => {
        
    }
    return (
    <div className="page">
        <div className="page-main">
            <div className="main-content app-content mt-0 main-background">
                <div className="side-app">
                    <div className="main-container container-fluid">
                       
                        <div className="row">
                            {
                                errorMessage && !changeEmail ?
                                    <Error errorMessage={errorMessage} />
                                    : null
                            }
                            <div className="col-xl-12">
                                <div className="card">
                                    {
                                        changeEmail 
                                       
                                    }
                                    <div className="row">
                                        <div className="col-xl-8">
                                            
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="card-title">Deactivate Account</div>
                                                </div>
                                                <div className="card-body">
                                                    <p>When you de-activate you can come back anytime to re-activate</p>
                                                    <label className="custom-control custom-checkbox mb-0">
                                                    </label>
                                                </div>
                                                <div className="card-footer text-end">
                                                    <a href="#" onClick={deactivateAccount}
                                                       className="btn btn-primary my-1">Deactivate</a>&nbsp;
                                                    <a href="javascript:void(0)" className="btn btn-danger my-1">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="card-title">Edit Contact</div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="text-center chat-image mb-5">
                                                        <div className="avatar avatar-xxl chat-profile mb-3 brround">
                                                            <a className="" href="#" onClick={(event => {
                                                                event.preventDefault();
                                                                navigate("/profile");
                                                            })}>
                                                                <img alt="avatar" src="/assets/images/users/7.jpg"
                                                                     className="brround"/>
                                                            </a>
                                                        </div>
                                                        <div className="main-chat-msg-name">
                                                            <a href="profile.html">
                                                                <h5 className="mb-1 text-dark fw-semibold">{`${data.firstName} ${data.lastName}`}</h5>
                                                            </a>
                                                            <p className="text-muted mt-0 mb-0 pt-0 fs-13">Registered nurse</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-body no-padding">
                                                        <div className="social social-profile-buttons">
                                                            <a className="social-icon text-primary" href=""><i className="fe fe-mail"></i></a>
                                                            <span className="my-auto">{data.email}</span>
                                                            <button id="bAcep" type="button" className="btn  btn-sm"
                                                                    data-bs-toggle="modal" data-bs-target="#modaldemo8"
                                                                    title="Edit email" onClick={editEmail}>
                                                                <i className="fe fe-edit"></i>
                                                            </button>
                                                        </div>
                                                        <div className="social social-profile-buttons">
                                                            <a className="social-icon text-primary" href=""><i
                                                                className="fe fe-phone"></i></a>
                                                            <span className="my-auto">{data.cellPhoneNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer text-end">
                                                    <a href="javascript:void(0)" className="btn btn-primary my-1">Update</a>&nbsp;
                                                    <a href="javascript:void(0)" className="btn btn-danger my-1">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-8">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="card-title">Delete Account</div>
                                                </div>
                                                <div className="card-body">
                                                    <p>when you delete account, you will lose all your profile and
                                                        associated
                                                        information</p>
                                                    <label className="custom-control custom-checkbox mb-0">
                                                    </label>
                                                </div>
                                                <div className="card-footer text-end">
                                                    <a href="#" className="btn btn-primary my-1" onClick={deleteAccount}>Delete
                                                        Account</a>&nbsp;
                                                    <a href="javascript:void(0)" className="btn btn-danger my-1">Cancel</a>
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
        </div>
    </div>
    )
}

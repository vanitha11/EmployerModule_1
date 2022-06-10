import Loader from "../common/Loader";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import useSessionStorage from "../../hooks/useSessionStorage";
import TextField from "../common/TextField";
import requestUtil from "../../helpers/requestUtil";
import useConfiguration from "../../hooks/useConfiguration";
import useValidation from "../../hooks/useValidation";
import {setLoadingPageFalse, setLoadingPageTrue} from "../common/Loader/action";

export default () => {
    const storage = useSessionStorage();
    const navigate = useNavigate();
    const config = useConfiguration();
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    //const [passwordType, setPasswordType] = useState("password");
    const login = storage.getItem("login");
    const validate = useValidation();
    const updateFormValue = (target) => {
        if (target.name === "currentPassword") {
            setCurrentPassword(target.value);
        } else if (target.name === "newPassword") {
            setNewPassword(target.value);
        } else if (target.name === "confirmPassword") {
            setConfirmPassword(target.value);
        }
    }
    const validateForm = () => {
        const result = validate('updatePassword', [{
            name: 'currentPassword',
            data: currentPassword
        }, {name: 'newPassword', data: newPassword}, {name: 'confirmPassword', data: confirmPassword}]);
        if (result.valid) {
            setFormErrors({});
        } else {
            setFormErrors(result.errors);
        }
        return result.valid;
    }
    const customPasswordCheck = () => {
        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                setFormErrors({'confirmPassword': ["Password and Confirm Password must be same"]});
                return false;
            }
        }
        if (currentPassword && newPassword) {
            if (currentPassword === newPassword) {
                setFormErrors({'newPassword': ["New Password must be different from Current Password"]});
                return false;
            }
        }
        return true;
    }
    const updatePassword = (event) => {
        event.preventDefault();
        if (validateForm() && customPasswordCheck()) {
            dispatch(setLoadingPageTrue());
            requestUtil(`${config.baseUrl}/Candidates/changepassword/`, "POST", {
                candidateId: login.candidateId,
                oldPassword: currentPassword,
                newPassword: newPassword
            }).then((result) => {
                dispatch(setLoadingPageFalse());
                if (result && result.isEmailExist) {
                    navigate("/dashboard");
                } else {
                    setErrorMessage(result.message);
                }
            }).catch((error) => {
                dispatch(setLoadingPageFalse());
                setErrorMessage(error.message);
            });
        }
    }
    useEffect(() => {
        if (!login) {
            // navigate('/');
        }
    }, [])


    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [iconStyleText, seticonStyleText] = useState("zmdi zmdi-eye-off text-muted");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            seticonStyleText("zmdi zmdi-eye text-muted")
            return;
        }
        setPasswordType("password")
        seticonStyleText("zmdi zmdi-eye-off text-muted")
    }

    const [passwordTypeNew, setPasswordTypeNew] = useState("password");
    const [passwordInputNew, setPasswordInputNew] = useState("");
    const [iconStyleTextNew, seticonStyleTextNew] = useState("zmdi zmdi-eye-off text-muted");
    const handlePasswordChangeNew = (evnt) => {
        setPasswordInputNew(evnt.target.value);
    }
    const togglePasswordNew = () => {
        if (passwordTypeNew === "password") {
            setPasswordTypeNew("text")
            seticonStyleTextNew("zmdi zmdi-eye text-muted")
            return;
        }
        setPasswordTypeNew("password")
        seticonStyleTextNew("zmdi zmdi-eye-off text-muted")
    }

    const [passwordTypeConfirm, setPasswordTypeConfirm] = useState("password");
    const [passwordInputConfirm, setPasswordInputConfirm] = useState("");
    const [iconStyleTextConfirm, seticonStyleTextConfirm] = useState("zmdi zmdi-eye-off text-muted");
    const handlePasswordChangeConfirm = (evnt) => {
        setPasswordInputConfirm(evnt.target.value);
    }
    const togglePasswordConfirm = () => {
        if (passwordTypeConfirm === "password") {
            setPasswordTypeConfirm("text")
            seticonStyleTextConfirm("zmdi zmdi-eye text-muted")
            return;
        }
        setPasswordTypeConfirm("password")
        seticonStyleTextConfirm("zmdi zmdi-eye-off text-muted")
    }

    return (
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header">
                                <h1 className="page-title">Update Password</h1>
                                <div>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                        <li className="breadcrumb-item" aria-current="page"><a
                                            href="javascript:void(0)">Profile Builder</a></li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    <div className="col-xl-8">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Update Password</h3>
                                            </div>
                                            {
                                                errorMessage &&
                                                <>
                                                    <div
                                                        className="toast wrap-input100 align-items-center text-white bg-danger border-0 show"
                                                        role="alert" aria-live="assertive" aria-atomic="true"
                                                        data-bs-autohide="false">
                                                        <div className="d-flex">
                                                            <div className="toast-body">
                                                                {errorMessage || 'Reset password failed! Please try again.'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>&nbsp;</div>
                                                </>
                                            }
                                            <div className="col-md-12 col-xl-12">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-12">
                                                            <div className="form-group">
                                                                <h5><label htmlFor="exampleInputname"><b>Email :
                                                                    {login && login.email} </b></label></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <TextField placeholder={"Current Password*"}
                                                                   divClass={"col-lg-6"} label={"Current Password"}
                                                                   name={'currentPassword'} type={passwordType}
                                                                   iconClass={iconStyleText}
                                                                   onChange={handlePasswordChange}
                                                                   errors={formErrors['currentPassword']}
                                                                   clickeye={togglePassword}
                                                                   updateValue={updateFormValue}/>
                                                    </div>
                                                    <div className="row">
                                                        <TextField placeholder={"New Password*"} divClass={"col-lg-6"}
                                                                   label={"New Password"}
                                                                   name={'newPassword'} type={passwordTypeNew}
                                                                   iconClass={iconStyleTextNew}
                                                                   onChange={handlePasswordChangeNew}
                                                                   errors={formErrors['newPassword']}
                                                                   clickeye={togglePasswordNew}
                                                                   updateValue={updateFormValue}/>
                                                    </div>
                                                    <div className="row">
                                                        <TextField placeholder={"Confirm Password*"}
                                                                   divClass={"col-lg-6"} label={"Confirm Password"}
                                                                   name={'confirmPassword'} type={passwordTypeConfirm}
                                                                   iconClass={iconStyleTextConfirm}
                                                                   onChange={handlePasswordChangeConfirm}
                                                                   errors={formErrors['confirmPassword']}
                                                                   clickeye={togglePasswordConfirm}
                                                                   updateValue={updateFormValue}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-end">
                                                <a href="#" className="btn btn-primary my-1" onClick={updatePassword}>Update
                                                    Password</a>
                                                &nbsp;&nbsp;
                                                <a href="#" className="btn btn-danger my-1" onClick={() => {
                                                    navigate('/dashboard');
                                                }}>Cancel</a>
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

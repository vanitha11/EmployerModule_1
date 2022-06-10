import Loader from "../common/Loader";
import TextField from "../common/TextField";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSearchParams} from "react-router-dom";
import {setLoadingPageTrue, setLoadingPageFalse} from "../common/Loader/action";
import {useDispatch} from "react-redux";
import useConfiguration from "../../hooks/useConfiguration";
import requestUtil from "../../helpers/requestUtil";
import useValidation from "../../hooks/useValidation";

export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const code = encodeURIComponent(searchParams.get("resetCode"));
    const config = useConfiguration();
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [validEmail, setValidEmail] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [userName, setUserName] = useState("");
    const url = config.baseUrl;
    const validate = useValidation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Reset Password";
        if (code && url) {
            dispatch(setLoadingPageTrue());
            //requestUtil(`${url}/Candidates/validateaccountforforgetpassword?activationcode=${code}`, "GET").then((result) => {
            requestUtil(`${url}/Candidates/validateaccountforforgetpasswordcandidate?activationcode=${code}`, "POST", {EncryptedString: code}).then((result) => {
                dispatch(setLoadingPageFalse());
                if (result && result.isEmailExist) {
                    setValidEmail(true);
                    setUserName(result.email);
                } else {
                    setErrorMessage(result.message);
                }
            }).catch((error) => {
                dispatch(setLoadingPageFalse());
                setErrorMessage(error.message || "Something went wrong");
            });
        }
    }, [code, url])
    const validateForm = () => {
        const result = validate('resetPassword', [{name: 'newPassword', data: newPassword}, {
            name: 'confirmNewPassword',
            data: confirmNewPassword
        }]);
        if (result.valid) {
            setFormErrors({});
        } else {
            setFormErrors(result.errors);
        }
        return result.valid;
    }
    const customPasswordCheck = () => {
        if (newPassword && confirmNewPassword) {
            if (newPassword !== confirmNewPassword) {
                setFormErrors({'confirmNewPassword': ["Password and Confirm Password must be same"]});
                return false;
            }
        }
        return true;
    }
    const updateFormValue = (target) => {
        if (target.name === "newPassword") {
            setNewPassword(target.value);
        } else if (target.name === "confirmNewPassword") {
            setConfirmNewPassword(target.value);
        }
    }
    const resetPassword = (event) => {
        event.preventDefault();
        if (validateForm() && customPasswordCheck()) {
            dispatch(setLoadingPageTrue());
            requestUtil(`${url}/Candidates/resetpassword/${userName}/${newPassword}`, "POST", {
                password: formErrors.password
            }).then((result) => {
                dispatch(setLoadingPageFalse());
                if (result && result.isEmailExist) {
                    navigate("/");
                } else {
                    setErrorMessage(result.message);
                }
            }).catch((error) => {
                dispatch(setLoadingPageFalse());
                setErrorMessage(error.message);
            });
        }
    }
    const gotoLogin = (e) => {
        e.preventDefault();
        navigate("/");
    }


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
            <Loader/>
            <div className="">
                <div className="container-login100">
                    <div className="wrap-login100 p-6">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title pb-5">
                                <a href="">
                                    <img src="assets/images/brand/logo-3.png" className="header-brand-img" alt=""/>
                                </a>
                            </span>
                            <span className="login100-form-title pb-5">
                                Password Reset
                            </span>
                            {
                                errorMessage &&
                                <>
                                    <div
                                        className="toast wrap-input100 align-items-center text-white bg-danger border-0 show"
                                        role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                                        <div className="d-flex">
                                            <div className="toast-body">
                                                {errorMessage || 'Reset password failed! Please try again.'}
                                            </div>
                                        </div>
                                    </div>
                                    <div>&nbsp;</div>
                                </>
                            }
                            {
                                validEmail && <>
                                    <TextField placeholder={"Password"} divClass={"col-lg-12"} label={"New Password"}
                                               name={'newPassword'} type={passwordType} clickeye={togglePassword}
                                               iconClass={iconStyleText} onChange={handlePasswordChange}
                                               errors={formErrors['newPassword']}
                                               updateValue={updateFormValue}/>


                                    <TextField placeholder={"Confirm Password"} divClass={"col-lg-12"}
                                               label={"Confirm Password"}
                                               name={'confirmNewPassword'} type={passwordTypeConfirm}
                                               clickeye={togglePasswordConfirm}
                                               iconClass={iconStyleTextConfirm} onChange={handlePasswordChangeConfirm}
                                               errors={formErrors['confirmNewPassword']} updateValue={updateFormValue}/>


                                    <div className="submit">
                                        <a className="btn btn-primary d-grid" href="#" onClick={resetPassword}>Save</a>
                                    </div>
                                </>
                            }
                            <div className="text-center mt-4">
                                <a className="text-primary ms-1" href="#" onClick={gotoLogin}>Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

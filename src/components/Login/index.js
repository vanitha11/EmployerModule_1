import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, resetError} from "./action";
import {useNavigate} from "react-router-dom";
import TextField from "../common/TextField";
import useValidation from "../../hooks/useValidation";
import useConfiguration from "../../hooks/useConfiguration";
import useSessionStorage from "../../hooks/useSessionStorage";
import Loader from "../common/Loader";
import {loginSelector} from "./selector";
import useEventListener from '@use-it/event-listener'


export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validate = useValidation();
    const config = useConfiguration();
    const storage = useSessionStorage();
    const {isError, isSuccess, data, errorMessage, profileFlag} = useSelector(loginSelector);
    const ENTER_KEYS = [13, 'Enter'];
    const handleKeyEvent = ({key}) => {
        if (ENTER_KEYS.includes(key)) {
            const isValid = validateForm();
            if (isValid) {
                dispatch(login({url: `${config.baseUrl}/Candidates/validatelogin`, ...formData}));
            }
        }
    }
    useEventListener('keydown', handleKeyEvent);
    useEffect(() => {
        document.title = "Overture Candidate Login";
    }, []);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState({});
    if (isSuccess) {
        storage.setItem("login", data);
        if (profileFlag && profileFlag.isProfileSubmitted) {
            navigate('/dashboard')
        } else {
            navigate('/dashboard');
        }
    }
    const validateForm = () => {
        const result = validate('login', [{name: 'email', data: formData.email}, {
            name: 'password',
            data: formData.password
        }]);
        if (result.valid) {
            setFormErrors({});
        } else {
            setFormErrors(result.errors);
        }
        return result.valid;
    }
    const updateFormValue = (target) => {
        const {name, value} = target;
        setFormData({...formData, [name]: value});
    }
    const loginClicked = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            dispatch(login({url: `${config.baseUrl}/Candidates/validatelogin`, ...formData}));
        }
    };

    const signUpClicked = (e) => {
        e.preventDefault();
        dispatch(resetError());
        navigate("/signup");
    }
    const forgotPassword = (e) => {
        e.preventDefault();
        navigate("/forgot");
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
    return (
        <div className={""}>
            <Loader/>
            <div className="page">
                <div className="">
                    <div className="container-login100">
                        <div className="wrap-login100 p-6">
                            <form className="login100-form needs-validation">
                                <span className="login100-form-title pb-5">
                                    <a href=""><img src="assets/images/brand/logo-3.png" className="header-brand-img"
                                                    alt=""/></a>
                                </span>
                                <span className="login100-form-title pb-5">
                                Candidate Login
                                </span>
                                {
                                    isError &&
                                    <>
                                        <div
                                            className="toast wrap-input100 align-items-center text-white bg-danger border-0 show"
                                            role="alert" aria-live="assertive" aria-atomic="true"
                                            data-bs-autohide="false">
                                            <div className="logingerrormgs">
                                                <div className="toast-body">
                                                    {errorMessage || 'Login failed! Please try again.'}
                                                </div>
                                            </div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </>
                                }
                                <div className="panel panel-primary">
                                    <div className="panel-body tabs-menu-body p-0 pt-5">
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="tab5">

                                                <div class="wrap-input100 validate-input input-group" id="Emailtoggle">
                                                    <label for="exampleInputname" class="logintextspace"><h5>Email</h5>
                                                    </label>
                                                </div>
                                                <TextField placeholder={"Email"} type={"email"} name={'email'}
                                                           iconClass={"zmdi zmdi-email text-muted"}
                                                           updateValue={updateFormValue} errors={formErrors['email']}/>

                                                <div class="wrap-input100 validate-input input-group"
                                                     id="Passwordtoggle">
                                                    <label for="exampleInputname" class="logintextspace">
                                                        <h5>Password</h5></label>
                                                </div>


                                                <TextField placeholder={"Password"} clickeye={togglePassword}
                                                           type={passwordType} name={'password'}
                                                           iconClass={iconStyleText}
                                                           onChange={handlePasswordChange}
                                                           updateValue={updateFormValue}
                                                           errors={formErrors['password']}/>


                                                <div className="text-end pt-4">
                                                    <p className="mb-0">
                                                        <a href="#" className="text-primary ms-1"
                                                           onClick={forgotPassword}>Forgot Password?</a></p>
                                                </div>
                                                <div className="container-login100-form-btn">
                                                    <a href="#" className="login100-form-btn btn-primary"
                                                       onClick={loginClicked} onKeyPress={(event) => {
                                                        if (event.key === 'Enter') {
                                                            loginClicked(event);
                                                        }
                                                    }}>
                                                        Login
                                                    </a>
                                                </div>
                                                <div className="text-center pt-3">
                                                    <p className="text-dark mb-0">Not a member?<a href="#"
                                                                                                  onClick={signUpClicked}
                                                                                                  className="text-primary ms-1">Sign
                                                        Up</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

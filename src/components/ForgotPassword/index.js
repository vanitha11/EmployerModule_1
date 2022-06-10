import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import useConfiguration from "../../hooks/useConfiguration";
import useValidation from "../../hooks/useValidation";
import TextField from "../common/TextField";
import Error from '../common/Message/error';
import Success from "../common/Message/success";
import requestUtil from '../../helpers/requestUtil';
import Loader from "../common/Loader";
import {setLoadingPageTrue, setLoadingPageFalse} from "../common/Loader/action";

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const validate = useValidation();
    const config = useConfiguration();
    const validateEmail = () => {
        const result = validate("forgotPassword", [{'name': 'email', data: email}]);
        if (result.valid) {
            setFormErrors({});
        } else {
            setFormErrors(result.errors);
        }
        return result.valid;
    }
    const gotoLogin = (e) => {
        e.preventDefault();
        navigate("/");
    }
    const resetPassword = (event) => {
        event.preventDefault();
        if (validateEmail()) {
            dispatch(setLoadingPageTrue());
            requestUtil(`${config.baseUrl}/Candidates/forgotpassword?email=${email}`, 'POST', {})
                .then(response => {
                    setSuccessMessage(response.message);
                    dispatch(setLoadingPageFalse());
                }).catch(error => {
                dispatch(setLoadingPageFalse());
                setError(true)
                setErrorMessage(error.message);
            });
        }
    }
    const updateFormValue = (target) => {
        setEmail(target.value);
    }
    return (<div className="page">
        <Loader/>
        <div className="">
            <div className="container-login100">
                <div className="wrap-login100 p-6">
                    <form className="login100-form validate-form">
                            <span className="login100-form-title pb-5">
                                <a href=""><img src="assets/images/brand/logo-3.png" className="header-brand-img"
                                                alt=""/></a>
                            </span>
                        <span className="login100-form-title pb-5">
                                Forgot Password
                        </span>
                        {
                            error && <Error errorMessage={errorMessage}/>
                        }
                        {
                            successMessage && <Success successMessage={successMessage} />
                        }
                        <p className="text-muted">Enter the email address registered on your account</p>
                        <TextField placeholder={"Email"} name={'email'} type={"email"} iconClass={"zmdi zmdi-email"}
                                   errors={formErrors['email']} updateValue={updateFormValue}/>
                        <div className="submit">
                            <a className="btn btn-primary d-grid" href="#" onClick={resetPassword}>Send Password Reset
                                Link</a>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-dark mb-0">Got it?<a className="text-primary ms-1" href="#"
                                                                    onClick={gotoLogin}>Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
}

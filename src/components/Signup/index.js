import React, {useEffect, useState} from "react";
import TextField from "../common/TextField";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signUpSelector} from "./selector";
import useValidation from "../../hooks/useValidation";
import useConfiguration from "../../hooks/useConfiguration";
import Loader from "../common/Loader";
import {signup, reset} from "./action";
import Checkbox from "../common/Checkbox";
import {useSearchParams} from "react-router-dom";

export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
    const navigate = useNavigate();
    const validate = useValidation();
    const config = useConfiguration();
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Overture Candidate Signup";
    }, []);
    const {signUpSuccess, signUpError, signUpErrorMessage} = useSelector(signUpSelector);
    if (signUpSuccess) {
        dispatch(reset());
        navigate("/signup/success");
    }
    const [signUpForm, setSignUpForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        zipCode: "",
        terms: false
    });
    const [formErrors, setFormErrors] = useState({});
    const goToLogin = () => {
        navigate("/");
    }
    const validateForm = () => {
        const result = validate('signUp', [
            {name: 'firstName', data: signUpForm.firstName},
            {name: 'lastName', data: signUpForm.lastName},
            {name: 'email', data: signUpForm.email},
            {name: 'password', data: signUpForm.password},
            {name: 'confirmPassword', data: signUpForm.confirmPassword},
            {name: 'zipCode', data: signUpForm.zipCode},
            {name: 'terms', data: signUpForm.terms}
        ]);
        if (result.valid) {
            setFormErrors({});
        } else {
            setFormErrors(result.errors);
        }
        return result.valid;
    }
    const customValidate = () => {
        if (!signUpForm.terms) {
            setFormErrors({...formErrors, terms: ["You must agree to the terms and conditions"]});
            return false;
        }
        return true;
    }
    const updateFormValue = (target) => {
        const {name, value} = target;
        setSignUpForm({...signUpForm, [name]: value});
        dispatch(reset());
    }
    const customValidation = () => {
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setFormErrors({...formErrors, confirmPassword: ["Password and Confirm Password must match"]});
            return false;
        }
        return true;
    }
    const signUpClicked = (e) => {
        e.preventDefault();
        if (!customValidation()) {
            return false;
        }
        if (validateForm() && customValidate()) {
            dispatch(signup({
                url: `${config.baseUrl}/Candidates/signup`, formData: {
                    firstName: signUpForm.firstName,
                    lastName: signUpForm.lastName,
                    email: signUpForm.email,
                    password: signUpForm.password,
                    zipCode: signUpForm.zipCode,
                    jobCategoryId: category
                }
            }));
        }
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
        <div>
            <Loader/>
            <div className="page">
                <div className="">
                    <div className="container-login100">
                        <div className="wrap-login100 p-6">
                            <form className="login100-form validate-form">
                            <span className="login100-form-title pb-5">
                                <a href="/">
                                    <img src="assets/images/brand/logo-3.png" className="header-brand-img" alt=""/>
                                </a>
                            </span>
                                <span className="login100-form-title">
                                    Candidate Registration
                                </span>
                                {
                                    signUpError &&
                                    <>
                                        <div
                                            className="toast wrap-input100 align-items-center text-white bg-danger border-0 show"
                                            role="alert" aria-live="assertive" aria-atomic="true"
                                            data-bs-autohide="false">
                                            <div className="d-flex">
                                                <div className="toast-body">
                                                    {signUpErrorMessage || 'Sign up failed! Please try again.'}
                                                </div>
                                            </div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </>
                                }
                                <div class="wrap-input100 validate-input input-group" id="Firstnametoggle">
                                    <label for="exampleInputname" class="logintextspace"><h5>First name</h5></label>
                                </div>
                                <TextField placeholder={"First name"} name={'firstName'} type={"text"}
                                           iconClass={"mdi mdi-account"} errors={formErrors['firstName']}
                                           updateValue={updateFormValue}/>
                                <div class="wrap-input100 validate-input input-group" id="Lasttoggle">
                                    <label for="exampleInputname" class="logintextspace"><h5>Last name</h5></label>
                                </div>
                                <TextField placeholder={"Last name"} name={'lastName'} type={"text"}
                                           iconClass={"mdi mdi-account"} errors={formErrors['lastName']}
                                           updateValue={updateFormValue}/>
                                <div class="wrap-input100 validate-input input-group" id="Emailtoggle">
                                    <label for="exampleInputname" class="logintextspace"><h5>Email</h5></label>
                                </div>
                                <TextField placeholder={"Email"} name={'email'} type={"email"}
                                           iconClass={"zmdi zmdi-email"} errors={formErrors['email']}
                                           updateValue={updateFormValue}/>
                                <div class="wrap-input100 validate-input input-group" id="Passwordtoggle">
                                    <label for="exampleInputname" class="logintextspace"><h5>Password</h5></label>
                                </div>
                                <TextField placeholder={'Password'} name={'password'} type={passwordType}
                                           iconClass={iconStyleText} onChange={handlePasswordChange}
                                           errors={formErrors['password']} updateValue={updateFormValue}
                                           clickeye={togglePassword}
                                />
                                <div class="wrap-input100 validate-input input-group" id="ConfirmPasswordtoggle">
                                    <label for="exampleInputname" class="logintextspace"><h5>Confirm Password</h5>
                                    </label>
                                </div>
                                <TextField placeholder={'Confirm Password'} name={'confirmPassword'}
                                           type={passwordTypeConfirm}
                                           iconClass={iconStyleTextConfirm} onChange={handlePasswordChangeConfirm}
                                           errors={formErrors['confirmPassword']} updateValue={updateFormValue}
                                           clickeye={togglePasswordConfirm}
                                />
                                <div class="wrap-input100 validate-input input-group" id="Zipcodetoggle">
                                    <label for="exampleInputname" class="logintextspace"><h5>Zipcode</h5></label>
                                </div>
                                <TextField placeholder={'Zip Code'} name={'zipCode'} type={"text"}
                                           iconClass={"zmdi zmdi-google-maps"} errors={formErrors['zipCode']}
                                           updateValue={updateFormValue}/>
                                <Checkbox name={"terms"} updateValue={updateFormValue} errors={formErrors['terms']}>
                                    <>
                                        I agree to the <a href="https://overturexl.com/terms-conditions.html"
                                                          target="_blank">Terms and Conditions</a>
                                    </>
                                </Checkbox>
                                <div className="container-login100-form-btn">
                                    <a href="Success.html" className="login100-form-btn btn-primary"
                                       onClick={signUpClicked}>
                                        Sign Up
                                    </a>
                                </div>
                                <div className="text-center pt-3">
                                    <p className="text-dark mb-0">Already have account?<a href="#" onClick={goToLogin}
                                                                                          className="text-primary ms-1">Sign
                                        In</a></p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

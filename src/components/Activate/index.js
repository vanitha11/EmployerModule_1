import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setLoadingPageTrue, setLoadingPageFalse} from "../common/Loader/action";
import useConfiguration from "../../hooks/useConfiguration";
import requestUtil from "../../helpers/requestUtil";
import Loader from "../common/Loader";

export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const code = encodeURIComponent(searchParams.get("activationCode"));
    const config = useConfiguration();
    const navigate = useNavigate();
    const [activationSuccess, setActivationSuccess] = useState(false);
    const [activationMessage, setActivationMessage] = useState("");
    const [activationSuccessNumber, setactivationSuccessNumber] = useState(0);
    const url = config.baseUrl;
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Activate";
        dispatch(setLoadingPageTrue());
        if (code && url) {
            // requestUtil(`${url}/Candidates/activate/${code}`, "POST").then((result) => {
            requestUtil(`${url}/Candidates/activateuser`, "POST", {EncryptedString: code}).then((result) => {
                dispatch(setLoadingPageFalse());
                setActivationSuccess(true);
                setActivationMessage(result.message);
                setactivationSuccessNumber(1);

            }).catch((error) => {
                dispatch(setLoadingPageFalse());
                setActivationSuccess(false)
                setActivationMessage(error.message);
                setactivationSuccessNumber(2);
            });
        }
    }, [code, url]);
    return (
        <div className="">
            <Loader/>
            <div className="">
                <div className="">
                    <div className="modal d-block pos-static">
                        <div className="container-login100">
                            <div className="wrap-login100 p-6">
                                <form className="login100-form validate-form">
                                <span className="login100-form-title pb-5">
                                    <a href=""><img src="assets/images/brand/Overturelogofull.png"
                                                    className="header-brand-img" alt=""/></a>
                                </span>
                                    {
                                        activationSuccessNumber == 1 && <div className="">
                                            <div className="modal-body text-center p-4 pb-5">
                                                <i className="icon icon-check fs-70 text-success lh-1 my-4 d-inline-block"></i>
                                                <h4 className="text-success mb-4">
                                                    Congratulations!<br/>
                                                    {activationMessage}
                                                </h4>
                                                <p className="mb-4">
                                                    <h4>
                                                        Please login and submit your profile.
                                                    </h4>
                                                </p>
                                                <a className="btn btn-primary" href="#" onClick={(event => {
                                                    event.preventDefault();
                                                    navigate("/");
                                                })}>OK</a>
                                            </div>
                                        </div>
                                    }
                                    {
                                        activationSuccessNumber == 2 && <>
                                            <div
                                                className="toast wrap-input100 align-items-center text-white bg-danger border-0 show"
                                                role="alert" aria-live="assertive" aria-atomic="true"
                                                data-bs-autohide="false">
                                                <div className="d-flex">
                                                    <div className="toast-body">
                                                        {activationMessage || 'Activation failed! Please try again.'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>&nbsp;</div>
                                        </>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

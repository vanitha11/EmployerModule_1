import {useSelector} from "react-redux";
import {useEffect} from "react";
import {signUpSelector} from "../Signup/selector";
import requestUtil from '../../helpers/requestUtil';
import useConfiguration from "../../hooks/useConfiguration";

const {useNavigate} = require('react-router-dom');
export default () => {
    const navigate = useNavigate();
    const config = useConfiguration();
    const {email} = useSelector(signUpSelector);
    const gotoLogin = (e) => {
        e.preventDefault();
        navigate('/');
    }
    useEffect(() => {
        document.title = "Overture Candidate Login";
    }, []);
    useEffect(() => {
        config.baseUrl && requestUtil(`${config.baseUrl}/Candidates/sendmail?Email=${email}`, 'GET').then(() => {

        });
    }, [config]);
    return (
        <div className="page">
            <div className="">
                <div className="modal d-block pos-static">
                    <div className="container-login100">
                        <div className="wrap-login100 p-6">
                            <form className="login100-form validate-form">
                            <span className="login100-form-title pb-5">
                                <a href="/"><img src="/assets/images/brand/logo-3.png" className="header-brand-img"
                                                 alt=""/></a>
                            </span>
                                <div className="">
                                    <div className="modal-body text-center p-4 pb-5">

                                        <i className="icon icon-check fs-70 text-success lh-1 my-4 d-inline-block"></i>
                                        <h4 className="text-success mb-4">
                                            Congratulations!<br/>
                                            Signup successful!
                                        </h4>
                                        <p className="mb-4">
                                        </p><h4>
                                        An email has been sent to your inbox.<br/>
                                        Please verify your account by clicking the link sent to the email <br/>
                                        you registered with and activate your account to complete your profile.

                                    </h4>
                                        <p></p>
                                        <a className="btn btn-success pd-x-25" href="#" onClick={gotoLogin}>OK</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

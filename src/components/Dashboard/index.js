import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {dashboardSelector} from "./selector";
import {loadDashboard} from "./action";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Footer from "../common/Footer";
import Card from "./card";
import useConfiguration from "../../hooks/useConfiguration";
import useSessionStorage from "../../hooks/useSessionStorage";

export default () => {
    const dispatch = useDispatch();
    const config = useConfiguration();
    const storage = useSessionStorage();
    const navigate = useNavigate();
    const login = storage.getItem("login");
    const {data} = useSelector(dashboardSelector);
    const profileSubmitted = data.profileFlag && data.profileFlag.isProfileSubmitted;
    useEffect(() => {
        document.title = "Overture Dashboard";
        if (config.baseUrl) {
            if (!login) {
                navigate("/");
            } else {
                dispatch(loadDashboard(config.baseUrl, login.candidateId));
            }
        }
    }, [config]);
    const editProfile = (event) => {
        event.preventDefault();
        navigate("/profile");
    };
    return (
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header">
                                <h1 className="page-title">Employer Dashboard</h1>
                                <div>
                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                    <a href="#" >
                                        <Card title={"Profile Builder"} value={data.percentageOfCompletion}
                                              valueLabel={profileSubmitted ? "Edit Profile" : "Complete Profile"}
                                              pathColor={"#4ecc48"}
                                              bgClass={"bg-green"} valueSuffix={"%"}>
                                            <a data-bs-toggle="slide" href="#">
                                                <div className="chart-circle-value-3 text-secondary fs-30">
                                                    <i className="icon icon-user-follow"></i>
                                                </div>
                                            </a>
                                        </Card>
                                    </a>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

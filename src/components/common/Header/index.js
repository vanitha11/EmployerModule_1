import './header.css';
import {useNavigate} from "react-router-dom";
import useSessionStorage from "../../../hooks/useSessionStorage";
import {useDispatch} from "react-redux";
import {logOut} from "../../Login/action";

export default () => {
    const navigate = useNavigate();
    const storage = useSessionStorage();
    const dispatch = useDispatch();
    const login = storage.getItem("login")
    const gotoProfilePage = (event) => {
        event.preventDefault();
        navigate('/account');
    }
    const logout = (event) => {
        event.preventDefault();
        storage.setItem("login", null);
        dispatch(logOut()).then(() => {
            navigate('/');
            window.location.reload();
        })
    }
    const gotoUpdatePassword = (event) => {
        event.preventDefault();
        navigate('/updatepassword');
    }
    return (
        <>
            <div className="app-header header sticky app-header-margin">
                <div className="container-fluid main-container">
                    <div className="d-flex">
                        <a aria-label="Hide Sidebar" className="app-sidebar__toggle" data-bs-toggle="sidebar"
                           href="#"></a>
                        <a className="logo-horizontal" href="MyDashboard">
                            <img src="/assets/images/brand/logo.png" className="header-brand-img light-logo"
                                 alt="logo"/>
                            <img src="/assets/images/brand/logo-3.png" className="header-brand-img light-logo"
                                 alt="logo"/>
                        </a>
                        <div className="main-header-center ms-3 d-none d-lg-block">
                            <input className="form-control" placeholder="Search for results..." type="search"/>
                            <button className="btn px-0 pt-2"><i className="fe fe-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="d-flex order-lg-2 ms-auto header-right-icons">
                            <button className="navbar-toggler navresponsive-toggler d-lg-none ms-auto" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-4"
                                    aria-controls="navbarSupportedContent-4" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon fe fe-more-vertical"></span>
                            </button>
                            <div className="navbar navbar-collapse responsive-navbar p-0">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                                    <div className="d-flex order-lg-2">
                                        {/*
                                        <div className="dropdown  d-flex notifications">
                                            <a className="nav-link icon" data-bs-toggle="dropdown">
                                                <i className="fe fe-bell"></i><span className=" pulse"></span>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <div className="drop-heading border-bottom">
                                                    <div className="d-flex">
                                                        <h6 className="mt-1 mb-0 fs-16 fw-semibold text-dark">Notifications</h6>
                                                    </div>
                                                </div>
                                                <div className="notifications-menu">
                                                    <a className="dropdown-item d-flex" href="notify-list.html">
                                                        <div
                                                            className="me-3 notifyimg  bg-primary brround box-shadow-primary">
                                                            <i className="fe fe-mail"></i>
                                                        </div>
                                                        <div className="mt-1 wd-80p">
                                                            <h5 className="notification-label mb-1">New Application
                                                                received</h5>
                                                            <span className="notification-subtext">3 days ago</span>
                                                        </div>
                                                    </a>
                                                    <a className="dropdown-item d-flex" href="notify-list.html">
                                                        <div
                                                            className="me-3 notifyimg  bg-secondary brround box-shadow-secondary">
                                                            <i className="fe fe-check-circle"></i>
                                                        </div>
                                                        <div className="mt-1 wd-80p">
                                                            <h5 className="notification-label mb-1">Project has been
                                                                approved</h5>
                                                            <span className="notification-subtext">2 hours ago</span>
                                                        </div>
                                                    </a>
                                                    <a className="dropdown-item d-flex" href="notify-list.html">
                                                        <div
                                                            className="me-3 notifyimg  bg-success brround box-shadow-success">
                                                            <i className="fe fe-shopping-cart"></i>
                                                        </div>
                                                        <div className="mt-1 wd-80p">
                                                            <h5 className="notification-label mb-1">Your Product
                                                                Delivered</h5>
                                                            <span className="notification-subtext">30 min ago</span>
                                                        </div>
                                                    </a>
                                                    <a className="dropdown-item d-flex" href="notify-list.html">
                                                        <div className="me-3 notifyimg bg-pink brround box-shadow-pink">
                                                            <i className="fe fe-user-plus"></i>
                                                        </div>
                                                        <div className="mt-1 wd-80p">
                                                            <h5 className="notification-label mb-1">Friend Requests</h5>
                                                            <span className="notification-subtext">1 day ago</span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="dropdown-divider m-0"></div>
                                                <a href="notify-list.html"
                                                   className="dropdown-item text-center p-3 text-muted">View all
                                                    Notification</a>
                                            </div>
                                        </div>

                                        <div className="dropdown  d-flex message">
                                            <a className="nav-link icon text-center" data-bs-toggle="dropdown">
                                                <i className="fe fe-message-square"></i><span
                                                className="pulse-danger"></span>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <div className="drop-heading border-bottom">
                                                    <div className="d-flex">
                                                        <h6 className="mt-1 mb-0 fs-16 fw-semibold text-dark">You have 5
                                                            Messages</h6>
                                                        <div className="ms-auto">
                                                            <a href="#"
                                                               className="text-muted p-0 fs-12">make all unread</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="message-menu">
                                                    <a className="dropdown-item d-flex" href="chat.html">
                                                        <span
                                                            className="avatar avatar-md brround me-3 align-self-center cover-image users1"
                                                            data-bs-image-src="~/assets/images/users/1.jpg"></span>
                                                        <div className="wd-90p">
                                                            <div className="d-flex">
                                                                <h5 className="mb-1">Peter Theil</h5>
                                                                <small className="text-muted ms-auto text-end">
                                                                    6:45 am
                                                                </small>
                                                            </div>
                                                            <span>Commented on file Guest list....</span>
                                                        </div>
                                                    </a>
                                                    <a className="dropdown-item d-flex" href="chat.html">
                                                        <span
                                                            className="avatar avatar-md brround me-3 align-self-center cover-image users15"
                                                            data-bs-image-src="~/assets/images/users/15.jpg"></span>
                                                        <div className="wd-90p">
                                                            <div className="d-flex">
                                                                <h5 className="mb-1">Abagael Luth</h5>
                                                                <small className="text-muted ms-auto text-end">
                                                                    10:35 am
                                                                </small>
                                                            </div>
                                                            <span>New Meetup Started......</span>
                                                        </div>
                                                    </a>
                                                    <a className="dropdown-item d-flex" href="chat.html">
                                                        <span
                                                            className="avatar avatar-md brround me-3 align-self-center cover-image users12"
                                                            data-bs-image-src="~/assets/images/users/12.jpg"
                                                            ></span>
                                                        <div className="wd-90p">
                                                            <div className="d-flex">
                                                                <h5 className="mb-1">Brizid Dawson</h5>
                                                                <small className="text-muted ms-auto text-end">
                                                                    2:17 pm
                                                                </small>
                                                            </div>
                                                            <span>Brizid is in the Warehouse...</span>
                                                        </div>
                                                    </a>
                                                    <a className="dropdown-item d-flex" href="chat.html">
                                                        <span
                                                            className="avatar avatar-md brround me-3 align-self-center cover-image users4"
                                                            data-bs-image-src="~/assets/images/users/4.jpg"
                                                            ></span>
                                                        <div className="wd-90p">
                                                            <div className="d-flex">
                                                                <h5 className="mb-1">Shannon Shaw</h5>
                                                                <small className="text-muted ms-auto text-end">
                                                                    7:55 pm
                                                                </small>
                                                            </div>
                                                            <span>New Product Realease......</span>
                                                        </div>
                                                    </a>

                                                </div>
                                                <div className="dropdown-divider m-0"></div>
                                                <a href="#"
                                                   className="dropdown-item text-center p-3 text-muted">See all
                                                    Messages</a>
                                            </div>
                                        </div>
                                        */}
                                        <div className="dropdown d-flex profile-1">
                                            <a href="#" data-bs-toggle="dropdown"
                                               className="nav-link leading-none d-flex">
                                                <img src="assets/images/users/nurseuserm.jpg" alt="profile-user"
                                                     className="avatar  profile-user brround cover-image"/>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <div className="drop-heading">
                                                    <div className="text-center">
                                                        <h5 className="text-dark mb-0 fs-14 fw-semibold">{login && login.fullName}</h5>
                                                        <small className="text-muted">Registered nurse</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-divider m-0"></div>
                                                <a className="dropdown-item" href="#" >
                                                    <i className="dropdown-icon fe fe-user"></i> My Account
                                                </a>
                                                <a className="dropdown-item" href="#" onClick={logout}>
                                                    <i className="dropdown-icon fe fe-alert-circle"></i> Sign out
                                                </a>
                                                <a className="dropdown-item" href="#" >
                                                    <i className="dropdown-icon zmdi zmdi-lock"></i> Update Password
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="jumps-prevent jumps-prevent-padding"></div>
        </>
    )
}

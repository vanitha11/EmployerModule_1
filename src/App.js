import './App.css';
import Login from './components/Login';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import SignupSuccess from "./components/SignupSuccess";
import ForgotPassword from "./components/ForgotPassword";
import Activate from "./components/Activate";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import UpdatePassword from "./components/UpdatePassword";
import Account from "./components/Account";
import Loader from "./components/common/Loader";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Locations from "./components/Locations";
import AddLocation from "./components/AddLocation";
import AddUsers from './components/AddUsers';
import AddCompany from './components/AddCompany';
import Contacts from './components/Contacts';
import User from './components/User';

function App() {
    return (
        <Router>
            <Loader/>
                <Header/>
                <Sidebar/>
            <Routes> 
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signup/success" element={<SignupSuccess/>}/>
                
                <Route path="/forgot" element={<ForgotPassword/>}/>
                <Route path="/updatepassword" element={<UpdatePassword/>}/>
                <Route path="/resetpassword" element={<ResetPassword/>}/>
                <Route path="/activate" element={<Activate/>}/>
                <Route path="/verifyemail" element={<VerifyEmail/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="*" element={<Login/>}/>

                <Route path="/locations" element={<Locations/>}/>
                <Route path="/addlocations" element={<AddLocation/>}/>
                <Route path="/adduser" element={<AddUsers />}/>
                <Route path="/addcompany" element={<AddCompany />}/>
                <Route path="/contacts" element={<Contacts />}/>
                <Route path="/user" element={<User />}/>
            </Routes>
        </Router>
    );
}

export default App;

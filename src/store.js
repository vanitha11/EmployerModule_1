import {configureStore} from "@reduxjs/toolkit";
import loginReducer from './components/Login/slice';
import dashboardReducer from "./components/Dashboard/slice";
import loaderReducer from "./components/common/Loader/slice";
import signUpReducer from "./components/Signup/slice";
import locationsReducer from "./components/Locations/slice";
import contactsReducer from "./components/Contacts/slice";
import userReducer from "./components/User/slice";
import companyReducer from './components/AddCompany/endpoints/slice';
import addUserReducer from './components/AddUsers/endpoints/slice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        dashboard: dashboardReducer,
        loader: loaderReducer,
        signUp: signUpReducer,
        locations: locationsReducer,
        contacts: contactsReducer,
        user: userReducer,
        addCompany: companyReducer,
        addUser: addUserReducer,
    }
});

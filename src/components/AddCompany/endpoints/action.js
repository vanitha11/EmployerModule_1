import {setLoading} from "../../common/Loader/slice";
import requestUtil from "../../../helpers/requestUtil";
import { 
    getTimeZoneDropdownSuccess, 
    getTimeZoneDropdownError,
    getZipCodeInfoSuccess,
    getZipCodeInfoError 
 } from "./slice";

export function getTimeZoneDropdownList(url) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        requestUtil(`${url}/Dropdown/gettimezoneinfo`, "POST", 
            {
                "employerId": 1003,
            }).then((response) => {
                dispatch(getTimeZoneDropdownSuccess(response.contacts));
            }).catch((error) => {
                dispatch(getTimeZoneDropdownError(error.message));
                dispatch(setLoading(false));
            });
        dispatch(setLoading(false));
    };
}

export function getZipCodeInfo(url, zipcode) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        requestUtil(`${url}/Zipcodes/getzipcodeinfo/${zipcode}`, "GET")
        .then((response) => {
                dispatch(getZipCodeInfoSuccess(response));
            }).catch((error) => {
                dispatch(getZipCodeInfoError(error.message));
                dispatch(setLoading(false));
            });
        dispatch(setLoading(false));
    };
}

export function saveCompanyInfo(url, companyInfo) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        requestUtil(`${url}/Employers/save`, "POST", 
            {
                "employerId": 1003,
            }).then((response) => {
                dispatch(getTimeZoneDropdownSuccess(response.contacts));
            }).catch((error) => {
                dispatch(getTimeZoneDropdownError(error.message));
                dispatch(setLoading(false));
            });
        dispatch(setLoading(false));
    };
}


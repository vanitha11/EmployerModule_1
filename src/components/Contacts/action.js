import {setLoading} from "../common/Loader/slice";
import requestUtil from "../../helpers/requestUtil";
import contactList from './contactList.json';
import { getContactListSuccess, getcontactListError } from "./slice";

export function getContactList(url) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        /* requestUtil(`${url}/Locations/getcontactlist`, "POST", 
            {
                "page": 0,
                "pageSize": 0,
                "sortOrder": "string",
                "sortColumn": "string",
                "locationId": 0,
            }).then((response) => {
                dispatch(getContactListSuccess(response.contacts));
            }).catch((error) => {
                dispatch(getcontactListError(error.message));
                dispatch(setLoading(false));
            }); */
        try {
            //const response = await requestUtil(`${url}/Dashboard/myprofileinfo/${candidateId}`, "GET");
            const response = contactList;
            dispatch(getContactListSuccess(response.contacts));
        } catch (error) {
            dispatch(getcontactListError(error.message));
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
    };
}
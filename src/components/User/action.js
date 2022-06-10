import {setLoading} from "../common/Loader/slice";
import requestUtil from "../../helpers/requestUtil";
import userList from './user.json';
import { getUserListSuccess, getUserListError } from "./slice";

export function getUserList(url) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        requestUtil(`${url}/EmployerUsers/getemployeruserlist`, "POST", 
            {
                "page": 0,
                "pageSize": 0,
                "sortOrder": "string",
                "sortColumn": "string",
                "locationId": 0,
                "searchText": 0
            }).then((response) => {
                dispatch(getUserListSuccess(response.employerUsers));
            }).catch((error) => {
                dispatch(getUserListError(error.message));
                dispatch(setLoading(false));
            });
        /* try {
            //const response = await requestUtil(`${url}/Dashboard/myprofileinfo/${candidateId}`, "GET");
            const response = userList;
            dispatch(getUserListSuccess(response.users));
        } catch (error) {
            dispatch(getUserListError(error.message));
            dispatch(setLoading(false));
        } */
        dispatch(setLoading(false));
    };
}
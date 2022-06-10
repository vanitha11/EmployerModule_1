import {setLoading} from "../../common/Loader/slice";
import requestUtil from "../../../helpers/requestUtil";
import { getLocationDropdownSuccess, getLocationDropdownError } from "./slice";

export function getLocationDropdownList(url) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        requestUtil(`${url}/Locations/get-location-list-for-dropdown`, "POST", 
            {
                "employerId": 1003,
            }).then((response) => {
                dispatch(getLocationDropdownSuccess(response.contacts));
            }).catch((error) => {
                dispatch(getLocationDropdownError(error.message));
                dispatch(setLoading(false));
            });
        dispatch(setLoading(false));
    };
}
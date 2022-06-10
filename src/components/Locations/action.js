import {setLoading} from "../common/Loader/slice";
import requestUtil from "../../helpers/requestUtil";
import locationList from './list.json';
import { getLocationListSuccess, getLocationListError, getFilterList, getFilterListError } from "./slice";

export function getLocationList(url) {
    return async (dispatch) => {
        dispatch(setLoading(true));
           requestUtil(`${url}/Locations/getlocationlist`, "POST", 
            {
                "page": 0,
                "pageSize": 0,
                "sortOrder": "string",
                "sortColumn": "string",
                "employerId": 1003,
                "searchText": 0
            }).then((response) => {
                dispatch(getLocationListSuccess(response.locations));
            }).catch((error) => {
                dispatch(getLocationListError(error.message));
                dispatch(setLoading(false));
            });
            //const response = await requestUtil(`https://qacaliberis.com/empapi/api/Locations/getlocationdetail`, "GET");
            //const response = locationList;
            //dispatch(getLocationListSuccess(response.data.locations));
        dispatch(setLoading(false));
    };
}

export function getFilteredList(searchItem, locationList) {
const locationName = searchItem.locationName;
const address = searchItem.address;

    return async (dispatch) => {
        let filteredList = [];
        filteredList = locationList.filter(item => {

            // 👇️ using AND (&&) operator
            if(locationName !== undefined && address !== undefined) {
                return item.locationName.toLowerCase().includes(locationName) && item.city.toLowerCase().includes(address.toLowerCase());
            } else if(locationName !== undefined) {
                return item.locationName.toLowerCase().includes(locationName)
            } else if(address !== undefined) {
                return item.city.toLowerCase().includes(address.toLowerCase());
            }
                
          });
            
        if(filteredList.length > 0) {
            dispatch(getFilterList(filteredList));
        } else {
            dispatch(getFilterListError("Filtered items not available"));
        }
        
    }
}
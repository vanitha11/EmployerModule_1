import {loadCandidateDashboard, loadCandidateDashboardError} from './slice';
import {setLoading} from "../common/Loader/slice";
import requestUtil from "../../helpers/requestUtil";

export function loadDashboard(url, candidateId) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await requestUtil(`${url}/Dashboard/myprofileinfo/${candidateId}`, "GET");
            dispatch(loadCandidateDashboard(response));
        } catch (error) {
            dispatch(loadCandidateDashboardError(error.message));
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
    };
}

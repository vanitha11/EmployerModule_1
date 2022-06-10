import {loginFailure, loginSuccess, loginRequest, reset, setProfileFlag} from './slice';
import {setLoading} from "../common/Loader/slice";
import requestUtil from '../../helpers/requestUtil';

export function login({url, email, password}) {
    return async (dispatch) => {
        dispatch(loginRequest());
        dispatch(setLoading(true));
        try {
            const response = await requestUtil(url, 'POST', {username: email, password});
            dispatch(loginSuccess(response));
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
        dispatch(setLoading(false));
    };
}

export function logOut() {
    return async (dispatch) => {
        dispatch(reset());
    };
}

export function resetError() {
    return async (dispatch) => {
        dispatch(reset());
    };
}

export function updateProfileFlag(flagName) {
    return async (dispatch) => {
        dispatch(setProfileFlag(flagName));
    }
}

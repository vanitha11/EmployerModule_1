import {setLoading} from "../common/Loader/slice";
import requestUtil from '../../helpers/requestUtil';
import {signUpSuccess, signUpError, resetError} from './slice';

export function signup({url, formData}) {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const data = await requestUtil(url, 'POST', formData);
            dispatch(signUpSuccess(formData.email));
        } catch (error) {
            console.log(error);
            dispatch(signUpError(error.message || "Sign up failed"));
        }
        dispatch(setLoading(false));
    };
}

export function reset() {
    return async dispatch => {
        dispatch(resetError());
    };
}

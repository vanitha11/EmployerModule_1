import {setLoading} from './slice';

export function setLoadingPageTrue() {
    return async (dispatch) => {
        dispatch(setLoading(true));
    }
}

export function setLoadingPageFalse() {
    return async (dispatch) => {
        dispatch(setLoading(false));
    }
}

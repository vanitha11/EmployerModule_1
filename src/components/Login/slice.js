import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: {},
    profileFlag: {}
};

export const loginSlice = createSlice({
    name: 'login'
    , initialState,

    reducers: {
        loginRequest: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = '';
            data: {
            }
        },
        loginSuccess: (state, action) => {
            state.isError = false;
            state.isSuccess = true;
            state.errorMessage = '';
            state.data = action.payload;
            state.profileFlag = action.payload && action.payload.profileFlag;
        },
        setProfileFlag: (state, action) => {
            const flagName = action.payload;
            const newProfileFlag = {...state.profileFlag, [flagName]: true};
            state.profileFlag = newProfileFlag;
        },
        loginFailure: (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.errorMessage = action.payload;
        },
        reset: state => {
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = '';
            state.data = {};
        }
    }
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    setProfileFlag,
    reset
} = loginSlice.actions;

export default loginSlice.reducer;

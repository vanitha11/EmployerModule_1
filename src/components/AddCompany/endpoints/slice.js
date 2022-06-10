import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    timezoneDropdownList: {},
    zipCodeInfo: {},
    errorMessage: null,
}

export const addCompanySlice = createSlice({
    name: 'addCompany', initialState,
    reducers: {
        getTimeZoneDropdownSuccess: (state, action) => {
            state.timezoneDropdownList = action.payload;
            state.errorMessage = null;
        },
        getTimeZoneDropdownError: (state, action) => {
            state.timezoneDropdownList = {};
            state.errorMessage = action.payload;
        },
        getZipCodeInfoSuccess: (state, action) => {
            state.zipCodeInfo = action.payload;
            state.errorMessage = null;
        },
        getZipCodeInfoError: (state, action) => {
            state.zipCodeInfo = {};
            state.errorMessage = action.payload;
        },
    }
});
export const {
    getTimeZoneDropdownSuccess,
    getTimeZoneDropdownError,
    getZipCodeInfoSuccess,
    getZipCodeInfoError
} = addCompanySlice.actions;

export default addCompanySlice.reducer;
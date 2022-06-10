import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    locationList: {},
    errorMessage: null,
    showEdit : false,
    showDelete : false,
    filteredList: {},
}

export const locationSlice = createSlice({
    name: 'locations', initialState,
    reducers: {
        getLocationListSuccess: (state, action) => {
            state.locationList = action.payload;
            state.errorMessage = null;
        },
        getLocationListError: (state, action) => {
            state.locationList = {};
            state.errorMessage = action.payload;
        },
        getFilterList: (state, action) => {
            state.filteredList = action.payload;
        },
        getFilterListError: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
});
export const {
    getLocationListSuccess,
    getLocationListError,
    getFilterList,
    getFilterListError
} = locationSlice.actions;

export default locationSlice.reducer;

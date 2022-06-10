import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    locationDropdownList: {},
    errorMessage: null,
}

export const addUserSlice = createSlice({
    name: 'addUser', initialState,
    reducers: {
        getLocationDropdownSuccess: (state, action) => {
            state.locationDropdownList = action.payload;
            state.errorMessage = null;
        },
        getLocationDropdownError: (state, action) => {
            state.locationDropdownList = {};
            state.errorMessage = action.payload;
        },
    }
});
export const {
    getLocationDropdownSuccess,
    getLocationDropdownError,
} = addUserSlice.actions;

export default addUserSlice.reducer;
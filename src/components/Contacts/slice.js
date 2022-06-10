import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    contactList: {},
    errorMessage: null,
    filteredList: {},
}

export const contactSlice = createSlice({
    name: 'contacts', initialState,
    reducers: {
        getContactListSuccess: (state, action) => {
            state.contactList = action.payload;
            state.errorMessage = null;
        },
        getcontactListError: (state, action) => {
            state.contactList = {};
            state.errorMessage = action.payload;
        },
        /* getFilterList: (state, action) => {
            state.filteredList = action.payload;
        },
        getFilterListError: (state, action) => {
            state.errorMessage = action.payload;
        } */
    }
});
export const {
    getContactListSuccess,
    getcontactListError,
} = contactSlice.actions;

export default contactSlice.reducer;

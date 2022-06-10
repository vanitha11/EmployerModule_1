import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userList: {},
    errorMessage: null,
    filteredList: {},
}

export const userSlice = createSlice({
    name: 'user', initialState,
    reducers: {
        getUserListSuccess: (state, action) => {
            state.userList = action.payload;
            state.errorMessage = null;
        },
        getUserListError: (state, action) => {
            state.userList = {};
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
    getUserListSuccess,
    getUserListError,
} = userSlice.actions;

export default userSlice.reducer;

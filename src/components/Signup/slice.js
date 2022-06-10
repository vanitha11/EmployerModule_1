import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signUpSuccess: false,
    signUpError: false,
    signUpErrorMessage: '',
    email: ''
}
export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        resetError: (state) => {
            state.signUpError = false;
            state.signUpSuccess = false;
            state.signUpErrorMessage = '';
        },
        signUpSuccess: (state, action) => {
            state.signUpSuccess = true;
            state.email = action.payload
        },
        signUpError: (state, action) => {
            state.signUpError = true;
            state.signUpErrorMessage = action.payload;
        },
    }
});
export const {signUpSuccess, signUpError, resetError} = signUpSlice.actions;
export default signUpSlice.reducer;

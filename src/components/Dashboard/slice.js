import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    data: {},
    errorMessage: null
}

export const dashboardSlice = createSlice({
    name: 'dashboard', initialState,
    reducers: {
        loadCandidateDashboard: (state, action) => {
            state.data = action.payload;
            state.errorMessage = null;
        },
        loadCandidateDashboardError: (state, action) => {
            state.data = {};
            state.errorMessage = action.payload;
        }
    }
});
export const {
    loadCandidateDashboard,
    loadCandidateDashboardError
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

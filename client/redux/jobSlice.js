import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        currentUserCreatedJobs: [],
    },
    reducers: {
        setCurrentUserCreatedJobs: (state, action)=>{
            state.currentUserCreatedJobs = action.payload
        }
    }
})

export const {setCurrentUserCreatedJobs} = jobSlice.actions;
export default jobSlice.reducer
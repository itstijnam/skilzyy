import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {

        //all users world-wide for admin
        allUsersPendingJobs: [],

        allUsersLiveJobs: [],
    },
    reducers: {
        setAllUsersPendingJobs: (state, action) => {
            state.allUsersPendingJobs = action.payload
        },
        setAllUsersLiveJobs: (state, action) => {
            state.allUsersLiveJobs = action.payload
        }
    }
})

export const {setAllUsersPendingJobs, setAllUsersLiveJobs} = adminSlice.actions;
export default adminSlice.reducer
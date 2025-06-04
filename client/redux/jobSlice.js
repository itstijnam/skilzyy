import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        currentUserCreatedJobs: [],
        appliedJobsByMe:[],
        //selected job from array (currentUserCreatedJobs)
        selectedJob: null,

        //selected job from my created job
        selcetedFromMyCreatedJob: null
    },
    reducers: {
        setCurrentUserCreatedJobs: (state, action)=>{
            state.currentUserCreatedJobs = action.payload
        },
        setAppliedJobsByMe: (state, action)=>{
            state.appliedJobsByMe = action.payload
        },
        setSelectedJob: (state, action)=>{
            state.selectedJob = action.payload
        },
        setSelcetedFromMyCreatedJob: (state, action)=>{
            state.selcetedFromMyCreatedJob = action.payload
        }
    }
})

export const {setCurrentUserCreatedJobs, setAppliedJobsByMe, setSelectedJob, setSelcetedFromMyCreatedJob} = jobSlice.actions;
export default jobSlice.reducer
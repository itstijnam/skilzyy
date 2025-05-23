import { createSlice } from "@reduxjs/toolkit";

const freelancerSlice = createSlice({
    name:'freelance',
    initialState: {
        gig: [],
        freelancers:[],
        selectedFreelancer: null,
        selectedGig: null,
    },
    reducers:{
        setGig: (state, action)=>{
            state.gig = action.payload
        },
        setFreelancers: (state, action)=>{
            state.freelancers = action.payload
        },
        setSelectedFreelancer: (state, action) =>{
            state.selectedFreelancer = action.payload
        },
        setSelectedGig: (state, action)=>{
            state.selectedGig = action.payload
        }
    }
});
export const {setFreelancers, setSelectedFreelancer, setGig, setSelectedGig} = freelancerSlice.actions;
export default freelancerSlice.reducer;
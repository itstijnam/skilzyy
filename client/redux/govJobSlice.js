import { createSlice } from "@reduxjs/toolkit";

const govjobSlice = createSlice({
    name: 'govJob',
    initialState: {
        allgovjobs: [],
        selectedGovJob: null,
    },
    reducers: {
        setAllgovjobs: (state, action)=>{
            state.allgovjobs = action.payload
        },
        setSelectedGovJob: (state, action)=>{
            state.selectedGovJob = action.payload
        }
    }
})

export const {setAllgovjobs, setSelectedGovJob} = govjobSlice.actions;
export default govjobSlice.reducer
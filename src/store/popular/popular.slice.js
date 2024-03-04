import { createSlice } from "@reduxjs/toolkit";

export const popularSlice = createSlice({
    initialState: [],
    name: "popular",
    reducers: {
        initialPopular: (__, { payload: data }) => {
            return data
        }
    }
})

export const { actions, reducer } = popularSlice
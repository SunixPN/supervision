import { createSlice } from "@reduxjs/toolkit";

export const popularSlice = createSlice({
    initialState: [],
    name: "popular",
    reducers: {
        initialPopular: (state, { payload: data }) => {
            for (let i = 0; i < data.length; i++) {
                state[i] = data[i]
            }
        }
    }
})

export const { actions, reducer } = popularSlice
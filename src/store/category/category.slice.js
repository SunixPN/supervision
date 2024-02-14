import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    initialState: [],
    name: "category",
    reducers: {
        initialCategory: (state, {payload: data}) => {
            for (let i = 0; i < data.length; i++) {
                state[i] = data[i]
            }
        }
    }
}) 

export const { actions, reducer } = categorySlice
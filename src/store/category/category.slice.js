import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    initialState: [],
    name: "category",
    reducers: {
        initialCategory: (__, {payload: data}) => {
            return data
        }
    }
}) 

export const { actions, reducer } = categorySlice
import { createSlice } from "@reduxjs/toolkit";

export const queriesSlice = createSlice({
    initialState: { category: true, news: true },
    name: "queries",
    reducers: {
        setCategory: (state) => {
            state.category = false
        },

        setNews: (state) => {
            state.news = false
        }
    }
})

export const { actions, reducer } = queriesSlice
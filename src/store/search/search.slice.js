import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    initialState: { isSearch: false, query: "", news: [] },
    name: "search",
    reducers: {
        setSearch: (state, { payload: search }) => {
            return {...state, isSearch: search}
        },

        setQuery: (state, { payload: query }) => {
            return {...state, query: query}
        },

        initialSearchNews: (state, { payload: data }) => {
            return {...state, news: data}
        }
    }
})

export const { actions, reducer } = searchSlice
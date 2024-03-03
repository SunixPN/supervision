import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
    initialState: [],
    name: "news",
    reducers: {
        initialNews: (__, { payload: data }) => {
            return data
        },
        
        deleteNews: (state, { payload: id }) => {
            return state.filter(newsPaper => newsPaper.newsId !== id)
        }
    }
})

export const { actions, reducer } = newsSlice
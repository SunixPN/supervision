import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
    initialState: [],
    name: "news",
    reducers: {
        initialNews: (state, { payload: data }) => {
            if (!data.length) {
                state.splice(0, state.length)
            }
            for (let i = 0; i < data.length; i++) {
                state[i] = data[i]
            }
        }
    }
})

export const { actions, reducer } = newsSlice
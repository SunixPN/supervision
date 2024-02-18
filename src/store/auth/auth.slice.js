import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    initialState: { auth: false, token: "" },
    name: "auth",
    reducers: {
        authorization: (state) => {
            state.auth = true
        }
    }
})

export const {actions, reducer} = authSlice
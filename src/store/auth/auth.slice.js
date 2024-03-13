import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    initialState: { auth: false, accountData: {} },
    name: "auth",
    reducers: {
        authorization: (state) => {
            return { ...state, auth: true}
        },

        setAccountData: (state, { payload: account }) => {
            return { ...state, accountData: account }
        }
    }
})

export const {actions, reducer} = authSlice
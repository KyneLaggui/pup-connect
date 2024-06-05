"use client"
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userId: null,
    role: null,
    setupFinished: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const { email, userId} = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.userId = userId;
        },
        REMOVE_ACTIVE_USER: (state, action) => {
            state.isLoggedIn = false;
            state.email = null;
            state.userId = null;
            state.role = null
        },
        SET_USER_ROLE: (state, action) => {
            const { role } = action.payload;
            state.role = role;
        },
        SET_SETUP_FINISHED: (state, action) => {
            const { setupFinished } = action.payload;
            state.setupFinished = setupFinished;
        },
    },
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_USER_ROLE, SET_SETUP_FINISHED} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserID = (state) => state.auth.userId;
export const selectRole = (state) => state.auth.role;
export const selectSetupFinished = (state) => state.auth.setupFinished;

export default authSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";
import {authReducerType} from "../tsTypes";
import {authUserAction, logOutUserAction} from "../actions/productActions";

export const initialState: authReducerType = {
    error: '',
    token: null,
    isLogin: false,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUser(state, action) {
            state.token = action.payload
            state.isLogin = true
        },
    },
    extraReducers: builder => {
        builder.addCase(authUserAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(authUserAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.token = action.payload
            state.isLogin = true
        })
        builder.addCase(authUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(logOutUserAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(logOutUserAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
            state.token = null
            state.isLogin = false
        })
        builder.addCase(logOutUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }

})
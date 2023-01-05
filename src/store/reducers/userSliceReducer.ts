import {userReducerType} from "../tsTypes";
import {createSlice} from "@reduxjs/toolkit";
import {
    addUserAction,
    deleteUserAction,
    getUserAction,
    getUsersAction,
    updateUserAction
} from "../actions/productActions";

const initialState: userReducerType = {
    user: null,
    users: null,
    error: '',
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        unSetUser(state) {
            state.user = null
            localStorage.removeItem("userId")
        }
    },
    extraReducers: builder => {
        builder.addCase(getUsersAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUsersAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.users = action.payload
        })
        builder.addCase(getUsersAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(getUserAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUserAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.user = action.payload
        })
        builder.addCase(getUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(addUserAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addUserAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.users += action.payload
        })
        builder.addCase(addUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(updateUserAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateUserAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(updateUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(deleteUserAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteUserAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(deleteUserAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }

})
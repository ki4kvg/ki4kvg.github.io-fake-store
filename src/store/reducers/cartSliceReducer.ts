import {createSlice} from "@reduxjs/toolkit";
import {cartReducerType} from "../tsTypes";
import {
    addCartAction,
    deleteCartAction,
    getCartAction,
    getCartsAction,
    getUserCartAction,
    updateCartAction
} from "../actions/productActions";

export const initialState: cartReducerType = {
    cart: null,
    carts: null,
    error: '',
    isLoading: false,
}

export const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCartsAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCartsAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.carts = action.payload
        })
        builder.addCase(getCartsAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(getCartAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCartAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.cart = action.payload
        })
        builder.addCase(getCartAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(getUserCartAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUserCartAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.cart = action.payload
        })
        builder.addCase(getUserCartAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(addCartAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addCartAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(addCartAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(updateCartAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateCartAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(updateCartAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(deleteCartAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteCartAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(deleteCartAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }

})
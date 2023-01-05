import {productReducerType} from "../tsTypes";
import {createSlice} from "@reduxjs/toolkit";
import {
    addProductAction,
    deleteProductAction,
    getCategoriesAction,
    getProductAction,
    getProductsAction,
    getProductsByCategoryAction,
    updateProductAction
} from "../actions/productActions";

const initialState: productReducerType = {
    product: null,
    products: null,
    categories: [],
    error: '',
    isLoading: false,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductsAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProductsAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.products = action.payload
        })
        builder.addCase(getProductsAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(getCategoriesAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.categories = action.payload
        })
        builder.addCase(getCategoriesAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(getProductsByCategoryAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProductsByCategoryAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.products = action.payload
        })
        builder.addCase(getProductsByCategoryAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(getProductAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProductAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.product = action.payload
        })
        builder.addCase(getProductAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(addProductAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addProductAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(addProductAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(updateProductAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateProductAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(updateProductAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(deleteProductAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteProductAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(deleteProductAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }

})
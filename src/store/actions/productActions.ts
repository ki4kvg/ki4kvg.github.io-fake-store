import {cartType, productType, userType} from "../tsTypes";
import {createAsyncThunk} from '@reduxjs/toolkit'
import {
    addCartRequest,
    addProductsRequest,
    addUserRequest,
    authUserRequest,
    deleteCartRequest,
    deleteProductRequest,
    deleteUserRequest,
    getCartsRequest,
    getCategoriesRequest,
    getOneCartRequest,
    getOneProductRequest,
    getOneUserRequest,
    getProductsByCategoryRequest,
    getProductsRequest,
    getUserCartRequest,
    getUsersRequest,
    updateCartRequest,
    updateProductRequest,
    updateUserRequest
} from "../../API/shopRequest";

export const getProductsAction = createAsyncThunk(
    'products/getProductsAction',
    async (_, thunkAPI) => {
        try {
            return await getProductsRequest()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getProductAction = createAsyncThunk(
    'products/getProductAction',
    async (productId: string | number | undefined, thunkAPI) => {
        try {
            return await getOneProductRequest(productId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getCategoriesAction = createAsyncThunk(
    'products/getCategoriesAction',
    async (_, thunkAPI) => {
        try {
            return await getCategoriesRequest()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getProductsByCategoryAction = createAsyncThunk(
    'products/getProductsByCategoryAction',
    async (name: string, thunkAPI) => {
        try {
            return await getProductsByCategoryRequest(name)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addProductAction = createAsyncThunk(
    'products/addProductAction',
    async (product: productType, thunkAPI) => {
        try {
            return await addProductsRequest(product)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const updateProductAction = createAsyncThunk(
    'products/updateProductAction',
    async (product: productType, thunkAPI) => {
        try {
            return await updateProductRequest(product)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const deleteProductAction = createAsyncThunk(
    'products/deleteProductAction',
    async (productId: string | number | undefined, thunkAPI) => {
        try {
            return await deleteProductRequest(productId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)


export const getCartsAction = createAsyncThunk(
    'products/getCartsAction',
    async (_, thunkAPI) => {
        try {
            return await getCartsRequest()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getCartAction = createAsyncThunk(
    'products/getCartAction',
    async (cartId: string | number | undefined, thunkAPI) => {
        try {
            return await getOneCartRequest(cartId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)


export const getUserCartAction = createAsyncThunk(
    'products/getUserCartAction',
    async (userId: string | number | undefined, thunkAPI) => {
        try {
            return await getUserCartRequest(userId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addCartAction = createAsyncThunk(
    'products/addCartAction',
    async (cart: any, thunkAPI) => {
        try {
            return await addCartRequest(cart)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const updateCartAction = createAsyncThunk(
    'products/updateCartAction',
    async (cart: any, thunkAPI) => {
        try {
            return await updateCartRequest(cart)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const deleteCartAction = createAsyncThunk(
    'products/deleteCartAction',
    async (cartId: string | number | undefined, thunkAPI) => {
        try {
            return await deleteCartRequest(cartId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getUsersAction = createAsyncThunk(
    'products/getUsersAction',
    async (_, thunkAPI) => {
        try {
            return await getUsersRequest()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getUserAction = createAsyncThunk(
    'products/getUserAction',
    async (userId: string | number | undefined, thunkAPI) => {
        try {
            const res = await getOneUserRequest(userId)
            if (res.id != undefined) {
                localStorage.setItem("userId", res.id.toString());
            }
            return res
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addUserAction = createAsyncThunk(
    'products/addUserAction',
    async (user: userType, thunkAPI) => {
        try {
            const res = await addUserRequest(user)
            console.log(res)
            return res
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const updateUserAction = createAsyncThunk(
    'products/updateUserAction',
    async (user: userType, thunkAPI) => {
        try {
            return await updateUserRequest(user)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const deleteUserAction = createAsyncThunk(
    'products/deleteUserAction',
    async (userId: string | number | undefined, thunkAPI) => {
        try {
            return await deleteUserRequest(userId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const authUserAction = createAsyncThunk(
    'products/authUserAction',
    async (body: any, thunkAPI) => {
        try {
            const res = await authUserRequest(body)
            localStorage.setItem("token", res.token);
            return res
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const logOutUserAction = createAsyncThunk(
    'products/logOutUserAction',
    async (user: userType | null | undefined, thunkAPI) => {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
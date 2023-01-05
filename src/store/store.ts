import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productSlice} from "./reducers/productSliceReducer";
import {cartSlice} from "./reducers/cartSliceReducer";
import {userSlice} from "./reducers/userSliceReducer";
import {authSlice} from "./reducers/authSliceReducer";

const rootReducer = combineReducers({
    productReducer: productSlice.reducer,
    cartReducer: cartSlice.reducer,
    userReducer: userSlice.reducer,
    authReducer: authSlice.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
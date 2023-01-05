import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProductCatalog from './Pages/ProductCatalogPage/ProductCatalog';
import {Layout} from "antd";
import {HeaderComponent} from "./components/HeaderComponent/HeaderComponent";
import st from "./Pages/ProductCatalogPage/ProductCatalog.module.css"
import NotFoundComponent from "./components/NotFoundComponent/NotFoundComponent";
import Product from "./Pages/ProductPage/Product";
import CartPage from "./Pages/CartPage/CartPage";
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage";
import {authSlice} from "./store/reducers/authSliceReducer";
import {useAppDispatch, useAppSelector} from "./Hooks/hooks";
import {getUserAction} from "./store/actions/productActions";

const App = () => {

    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userId")

    const {isLogin} = useAppSelector(state => state.authReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        token && dispatch(authSlice.actions.authUser(token))
    }, [token])

    useEffect(() => {
        user && dispatch(getUserAction(user))
    }, [user])

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Layout className={st.layoutBlock}>
                <HeaderComponent/>
                <Routes>
                    <Route path="*" element={<NotFoundComponent/>}/>
                    <Route path="/" element={<ProductCatalog/>}/>
                    <Route path="/:category" element={<ProductCatalog/>}/>
                    <Route path="/users/:userId" element={!isLogin ? <Navigate replace to='/'/> : <ProfilePage/>}/>
                    <Route path="/products/:productId" element={<Product/>}/>
                    <Route path="/carts/user/:userCartId" element={!isLogin ? <Navigate replace to='/'/> : <CartPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

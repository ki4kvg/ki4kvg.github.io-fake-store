import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductCatalog from './components/ProductCatalog/ProductCatalog';
import {Layout} from "antd";
import {HeaderComponent} from "./components/HeaderComponent/HeaderComponent";
import st from "./components/ProductCatalog/ProductCatalog.module.css"
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Product from "./components/Product/Product";
import CartPage from "./components/Cart/CartPage";
import {ProfilePage} from "./components/ProfilePage/ProfilePage";
import {authSlice} from "./store/reducers/authSliceReducer";
import {useAppDispatch} from "./Hooks/hooks";
import {getUserAction} from "./store/actions/productActions";

const App = () => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userId")
    const dispatch = useAppDispatch()

    useEffect(()=> {
        token && dispatch(authSlice.actions.authUser(token))
    }, [token])

    useEffect(()=> {
        user && dispatch(getUserAction(user))
    }, [user])

    return (
        <BrowserRouter>
            <Layout className={st.layoutBlock}>
                <HeaderComponent/>
                <Routes>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="/" element={<ProductCatalog/>}/>
                    <Route path="/:category" element={<ProductCatalog/>}/>
                    <Route path="/users/:userId" element={<ProfilePage/>}/>
                    <Route path="/products/:productId" element={<Product/>}/>
                    <Route path="/carts/user/:userCartId" element={<CartPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

import {Col, Layout, Row} from "antd";
import React, {useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import {useParams} from "react-router-dom";
import {getCartAction, getProductsAction} from "../../store/actions/productActions";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import st from "./CartPage.module.css"
import CartCard from "../../components/Cart/CartCard/CartCard";

const CartPage = () => {

    const dispatch = useAppDispatch()
    const {userCartId} = useParams()

    const {products} = useAppSelector(state => state.productReducer)
    const {cart} = useAppSelector(state => state.cartReducer)

    const FilterProducts = products?.map((item) => {
        if (cart != null) {
            return cart.products.map((item2) => {
                if (item.id == item2.productId) {
                    return <CartCard key={item.id} p={item} cartId={cart.id}/>;
                }
            });
        }
    })

    useEffect(() => {
        dispatch(getProductsAction())
        dispatch(getCartAction(userCartId))
    }, [userCartId])

    return (
        <Layout>
            <Content>
                <Row className={st.selectedProducts}>
                    <Col span={20}>
                        {FilterProducts}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default CartPage
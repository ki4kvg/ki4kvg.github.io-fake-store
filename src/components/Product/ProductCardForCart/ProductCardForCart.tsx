import {Alert, Button, Card, Row} from "antd";
import st from "../Product.module.css";
import React from "react";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {addCartAction} from "../../../store/actions/productActions";
import {openNotification} from "../../Notification/Notification";

const {Meta} = Card

export const ProductCardForCart = ({product}: any) => {

    const dispatch = useAppDispatch()
    const {cart} = useAppSelector(state => state.cartReducer)
    const {isLogin} = useAppSelector(state => state.authReducer)

    const addToCart = () => {
        const newDate = new Date()
        const date = newDate.toLocaleDateString('en-US')
        const addProduct = {
            userId: cart?.userId,
            date: date,
            products: [{productId: product.id, quantity: 1}]
        }
        dispatch(addCartAction(addProduct)).then((res: any) => {
            openNotification(`Product add info`, `Product had been added successfully. Cart ID ${res.payload.id}`, 'success' )
        }).catch(error => {
            openNotification(`Product add info`, `Something went wrong. Error: ${error}`, 'error' )
        })
    }

    return (
        <Card
            className={st.card}
            hoverable
            style={{width: 240}}
            cover={<img className={st.image} src={product?.image}/>}
        >
            <Meta title={product?.title}/>
            <Row>
                <ShoppingCartOutlined className={st.icon}/>
            </Row>
            <Row className={st.rate}>
                {isLogin ?
                    <Button className={st.addButton} type={"primary"} onClick={addToCart}>Add to Cart</Button>
                    :
                    <Alert className={st.alert} message="Please log in to add products to your cart" type="info"/>
                }
            </Row>
        </Card>
    )
}
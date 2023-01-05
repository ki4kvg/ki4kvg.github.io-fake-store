import {Avatar, Card, Col, Row} from "antd";
import Meta from "antd/es/card/Meta";
import React, {useState} from "react";
import st from "./ProductCard.module.css"
import {useNavigate} from "react-router-dom";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {addCartAction} from "../../../store/actions/productActions";
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {openNotification} from "../../Notification/Notification";

const ProductCard = ({p}: any) => {

    const [loading] = useState(false)

    const dispatch = useAppDispatch()
    const {cart} = useAppSelector(state => state.cartReducer)
    const {isLogin} = useAppSelector(state => state.authReducer)

    const navigate = useNavigate()

    const addToCart = () => {
        const newDate = new Date()
        const date = newDate.toLocaleDateString('en-US')
        const addProduct = {
            userId: cart?.userId,
            date: date,
            products: [{productId: p.id, quantity: 1}]
        }
        dispatch(addCartAction(addProduct)).then((res: any) => {
            openNotification(`Product add info`, `Product had been added successfully. Cart ID ${res.payload.id}`, 'success')
        }).catch(error => {
            openNotification(`Product add info`, `Something went wrong. Error: ${error}`, 'error')
        })
    }

    return (
        <Col span={24} className={st.cardColumn}>
            <Card loading={loading}
                  className={st.card}
                  hoverable={true}
                  extra={isLogin &&
                      <Row className={st.cartExtra}>
                          <ShoppingCartOutlined onClick={addToCart} className={st.icon}/>
                      </Row>
                  }
            >
                <div onClick={() => navigate(`/products/${p.id}`)}>
                    <Meta
                        className={st.cardMeta}
                        avatar={<Avatar src={p.image}/>}
                        title={p.title}
                        description={p.price + "$"}
                    />
                </div>
            </Card>

        </Col>
    )
}

export default ProductCard;
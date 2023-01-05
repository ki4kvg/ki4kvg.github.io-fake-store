import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {addCartAction, getProductAction} from "../../store/actions/productActions";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Alert, Breadcrumb, Button, Col, Image, Rate, Row, Tag} from "antd";
import st from "./Product.module.css"
import {Spinner} from "../../components/Spinner/Spinner";
import {openNotification} from "../../components/Notification/Notification";
import {HomeOutlined} from '@ant-design/icons';

export const Product = () => {

    const dispatch = useAppDispatch()
    const {productId} = useParams()
    const navigate = useNavigate()
    const {cart} = useAppSelector(state => state.cartReducer)
    const {isLogin} = useAppSelector(state => state.authReducer)
    const {product} = useAppSelector(state => state.productReducer)

    const addToCart = () => {
        const newDate = new Date()
        const date = newDate.toLocaleDateString('en-US')
        const addProduct = {
            userId: cart?.userId,
            date: date,
            products: [{productId: product?.id, quantity: 1}]
        }
        dispatch(addCartAction(addProduct)).then((res: any) => {
            openNotification(`Product add info`, `Product had been added successfully. Cart ID ${res.payload.id}`, 'success')
        }).catch(error => {
            openNotification(`Product add info`, `Something went wrong. Error: ${error}`, 'error')
        })
    }


    useEffect(() => {
        dispatch(getProductAction(productId))
    }, [productId])

    if (product?.id != productId) {
        return <Spinner/>
    }
    return (
        <Col className={st.layout} span={24}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={"/"}><HomeOutlined/></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={`/${product?.category}`}>{product?.category}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{product?.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Row className={st.mainInfo}>
                <Col className={st.descriptionBlock} span={8}>
                    <Row className={st.imageBlock}><Image className={st.image} src={product?.image}/></Row>
                </Col>
                <Col span={12} className={st.priceRateCol}>
                    <Row className={st.title}>{product?.title}</Row>
                    <Row className={st.category}><Tag
                        onClick={() => navigate(`/${product?.category}`)}>{product?.category}</Tag></Row>
                    <Row className={st.rate}>
                        <span className={st.rateNumber}>{product?.rating.rate}</span>
                        <Rate disabled allowHalf defaultValue={product?.rating.rate}/>
                    </Row>
                    <Row className={st.rateCount}>{product?.rating.count} Responses</Row>
                    <Row className={st.price}>Price: {product?.price}$</Row>
                    <Row className={st.description}>{product?.description}</Row>
                    <Row className={st.addToCart}>
                        {isLogin ?
                            <Button type={"primary"} onClick={addToCart}>Add to Cart</Button>
                            :
                            <Alert message="Please log in to add products to your cart" type="info"/>
                        }
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default Product
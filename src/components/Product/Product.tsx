import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {getProductAction} from "../../store/actions/productActions";
import {useNavigate, useParams} from "react-router-dom";
import {Col, Image, Rate, Row, Spin} from "antd";
import st from "./Product.module.css"
import {ProductCardForCart} from "./ProductCardForCart/ProductCardForCart";
import {Spinner} from "../Spinner/Spinner";

export const Product = () => {

    const dispatch = useAppDispatch()
    const {productId} = useParams()
    const navigate = useNavigate()

    const {product} = useAppSelector(state => state.productReducer)

    useEffect(() => {
        dispatch(getProductAction(productId))
    }, [productId])

    if (product?.id != productId) {
        return <Spinner/>
    }
    return (
        <Col className={st.layout} span={24}>
            <Row className={st.title}>{product?.title}</Row>
            <Row className={st.category}><span
                onClick={() => navigate(`/${product?.category}`)}>{product?.category}</span></Row>
            <Row className={st.mainInfo}>
                <Col className={st.descriptionBlock} span={8}>
                    <Row className={st.imageBlock}><Image className={st.image} src={product?.image}/></Row>
                </Col>
                <Col span={12} className={st.priceRateCol}>
                    <Row className={st.rate}>
                        <span className={st.rateNumber}>{product?.rating.rate}</span>
                        <Rate disabled allowHalf defaultValue={product?.rating.rate}/>
                    </Row>
                    <Row className={st.rateCount}>{product?.rating.count} Responses</Row>
                    <Row className={st.price}>Price: {product?.price}$</Row>
                    <Row className={st.description}>{product?.description}</Row>
                </Col>
                <Col span={4} className={st.addToCartCol}>
                    <Row><ProductCardForCart key={product?.id} product={product}/></Row>
                </Col>
            </Row>
        </Col>
    )
}

export default Product
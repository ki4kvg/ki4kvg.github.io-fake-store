import {Input, Layout, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {getProductsAction} from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCatalog/ProductCard/ProductCard";
import st from "./ProductCatalog.module.css"
import {productType} from "../../store/tsTypes";
import {SiderComponent} from "../../components/Sider/SiderComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
import {Spinner} from "../../components/Spinner/Spinner";

const ProductCatalog = () => {
    const dispatch = useAppDispatch()

    const {products, isLoading} = useAppSelector(state => state.productReducer)

    const [searchValue, setSearchValue] = useState('')

    const onSearch = (e: any) => {
        setSearchValue(e.target.value)
    }

    const filteredProducts = () => {
        if (products != null) {
            const filteredProds = products.filter(p => {
                return p.title.toLowerCase().includes(searchValue.toLowerCase())
            })
            if (filteredProds.length === 0) {
                return <NotFoundComponent/>
            }
            return filteredProds.map((p: productType) => <ProductCard key={p.id} p={p}/>)
        }
        return undefined
    }

    const filteredProds = filteredProducts()

    useEffect(() => {
        dispatch(getProductsAction())
    }, [])

    return (
        <Layout>
            <SiderComponent/>
            <Content style={{overflow: "hidden"}} className={st.content}>
                <Input
                    className={st.search}
                    placeholder="Search product here"
                    allowClear
                    size="large"
                    onChange={onSearch}
                />
                <Row
                     justify={"center"}
                     gutter={16}>
                    {isLoading ? <Spinner/> : filteredProds}
                </Row>
            </Content>
        </Layout>
    );
}

export default ProductCatalog
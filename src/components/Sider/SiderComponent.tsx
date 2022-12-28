import Sider from "antd/es/layout/Sider";
import React, {useEffect, useState} from "react";
import {Radio, RadioChangeEvent} from "antd";
import {getCategoriesAction, getProductsAction, getProductsByCategoryAction} from "../../store/actions/productActions";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import st from "./SiderComponent.module.css"
import {useNavigate, useParams} from "react-router-dom";

export const SiderComponent = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {category} = useParams()
    const {categories} = useAppSelector(state => state.productReducer)

    const radioGroup = categories?.map((c, index) => {
        return <Radio value={c} key={index}>{c}</Radio>
    })

    const [value, setValue] = useState("SelectAll")

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value)
        if (e.target.value != "SelectAll") {
            navigate(`/${e.target.value}`)
        } else {
            navigate('/')
        }
    };

    useEffect(() => {
        if (category != undefined) {
            dispatch(getProductsByCategoryAction(category))
        } else {
            dispatch(getProductsAction())
        }
    }, [category])

    useEffect(() => {
        dispatch(getCategoriesAction())
    }, [])

    return (
        <Sider className={st.sider}>
            <Radio.Group className={st.radioGroup} value={category || value} onChange={onChange}>
                <Radio value={"SelectAll"}>Select all</Radio>
                {radioGroup}
            </Radio.Group>
        </Sider>
    )
}
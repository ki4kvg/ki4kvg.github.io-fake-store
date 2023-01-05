import {Radio, RadioChangeEvent} from "antd";
import React, {useEffect, useState} from "react";


import st from "./RadioGroupComponent.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {
    getCategoriesAction,
    getProductsAction,
    getProductsByCategoryAction
} from "../../store/actions/productActions";

export const RadioGroupComponent = () => {

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
        <Radio.Group className={st.radioGroup} value={category || value} onChange={onChange}>
            <Radio value={"SelectAll"}>Select all</Radio>
            {radioGroup}
        </Radio.Group>
    )
}
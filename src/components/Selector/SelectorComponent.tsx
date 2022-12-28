import {Select} from "antd";
import st from "./SelectorComponent.module.css";
import React from "react";
import {getProductAction} from "../../store/actions/productActions";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";

export const SelectorComponent = () => {

    const dispatch = useAppDispatch()
    const {product, products} = useAppSelector(state => state.productReducer)

    const onChange = (value: string | undefined) => {
        dispatch(getProductAction(value))
        console.log(`selected ${value}`);
        console.log(product)
    };

    const onSearch = (value: any) => {
        console.log('search:', value);
    };

    const searchOptions = products?.map(p => {
        return (
            {
                value: p.id,
                label: p.title
            }
        )
    })

    return (
        <Select
            size={"large"}
            className={st.searchBar}
            showSearch
            placeholder="Select a product"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={searchOptions}
        />
    )
}
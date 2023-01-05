import React from "react";
import {Layout, Tabs} from "antd";
import {AddProductForm} from "../ProductActionForm/AddProductForm/AddProductForm";
import {ChangeProductTab} from "../ProductActionForm/ChangeProductForm/ChangeProductTab";
import {DeleteProductForm} from "../ProductActionForm/DeleteProductForm/DeleteProductForm";
import st from "./ProductTabs.module.css"

const items = [
    {
        label: "Add new product",
        children: <AddProductForm/>
    },
    {
        label: "Change product",
        children: <ChangeProductTab/>
    },
    {
        label: "Delete product",
        children: <DeleteProductForm/>
    },
]

export const ActionsWithProducts = () => {
    return (
        <Layout>
            <Tabs
                className={st.productTabs}
                defaultActiveKey="0"
                tabPosition="top"
                items={
                    items.map((el, i) => {
                        const id = String(i);
                        return {
                            label: el.label,
                            key: id,
                            children: el.children,
                        };
                    })}
            />
        </Layout>
    )
}
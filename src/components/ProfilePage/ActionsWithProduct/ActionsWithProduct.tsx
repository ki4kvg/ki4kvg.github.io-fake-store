import React from "react";
import {Layout, Tabs} from "antd";
import {AddProductForm} from "../../UserProfileForms/Product/AddProductForm/AddProductForm";
import {ChangeProductTab} from "../../UserProfileForms/Product/ChangeProductForm/ChangeProductTab";
import {DeleteProductForm} from "../../UserProfileForms/Product/DeleteProductForm/DeleteProductForm";

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
                defaultActiveKey="0"
                tabPosition="top"
                style={{height: 220}}
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
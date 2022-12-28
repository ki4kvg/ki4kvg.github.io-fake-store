import {Button, Form, Input, InputNumber} from "antd";
import React from "react";
import {productType} from "../../../../store/tsTypes";
import {addProductAction} from "../../../../store/actions/productActions";
import {useAppDispatch} from "../../../../Hooks/hooks";
import {openNotification} from "../../../Notification/Notification";
import st from "../ChangeProductForm/ChangeProductTab.module.css";

export const AddProductForm = () => {

    const dispatch = useAppDispatch()

    const onFinish = (values: productType) => {
        dispatch(addProductAction(values)).then(res => {
                openNotification("Add product info", `Product have been added successfully.`, 'success')
            }
        ).catch(error =>
            openNotification("Add product info", `Something went wrong. Error: ${error}`, 'error')
        )
    };

    return (
        <Form
            className={st.form}
            name="product"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="title"
                label="Title"
                rules={[
                    {
                        min: 3,
                        message: 'Title must be at least 3 characters long',
                    },
                    {
                        required: true,
                        message: 'Please input product title',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                tooltip="Input price of new product"
                rules={[
                    {
                        required: true,
                        message: 'Please input product price!',
                    },
                ]}
            >
                <InputNumber
                    min="1"
                    max="100"
                    step="0.01"
                    controls={false}
                />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input product description!',
                    },
                    {
                        min: 10,
                        message: 'Description should be at least 10 characters long',
                    },
                    {
                        max: 500,
                        message: 'Description should be not more than 250 characters long',
                    }
                ]}
            >
                <Input.TextArea/>
            </Form.Item>

            <Form.Item
                name="image"
                label="Product image"
                rules={[
                    {
                        required: true,
                        message: 'Please past link to product image!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="category"
                label="Product category"
                rules={[
                    {
                        required: true,
                        message: 'Please input product category!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    )
}
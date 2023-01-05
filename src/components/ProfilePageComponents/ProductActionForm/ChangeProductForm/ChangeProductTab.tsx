import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import React, {useEffect} from "react";
import {productType} from "../../../../store/tsTypes";
import {updateProductAction} from "../../../../store/actions/productActions";
import {useAppDispatch, useAppSelector} from "../../../../Hooks/hooks";
import {openNotification} from "../../../Notification/Notification";
import st from "./ChangeProductTab.module.css"
import {SelectorComponent} from "../../../Selector/SelectorComponent";

export const ChangeProductTab = () => {

    const {product} = useAppSelector(state => state.productReducer)
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const setInitialValues = () => {
        if (product != null) {
            return {
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image
            }
        } else return null
    }

    const InitialValues: any = setInitialValues()

    const onFinish = (values: productType) => {
        values = {
            ...values,
            id: product?.id
        }
        dispatch(updateProductAction(values)).then(() => {
                openNotification("Update product info", `Product have been updated successfully.`, 'success')
            }
        ).catch(error =>
            openNotification("Update product info", `Something went wrong. Error: ${error}`, 'error')
        )
    };

    useEffect(() => {
        form.setFieldsValue(InitialValues)
    }, [form, InitialValues])

    return (
        <Col>
            <Row className={st.searchBarRow}>
                <SelectorComponent/>
            </Row>
            <Row>
                <Form
                    form={form}
                    className={st.form}
                    initialValues={InitialValues}
                    name="product"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        initialValue={product?.title}
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
                        initialValue={product?.price}
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
                        initialValue={product?.description}
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
                        initialValue={product?.image}
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
                        initialValue={product?.category}
                        label="Product category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product category!'
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Change Product
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </Col>
    )
}
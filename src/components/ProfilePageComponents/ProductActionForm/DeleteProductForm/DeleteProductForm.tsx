import {useAppDispatch, useAppSelector} from "../../../../Hooks/hooks";
import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "antd";
import {deleteProductAction} from "../../../../store/actions/productActions";
import {openNotification} from "../../../Notification/Notification";
import st from "./DeleteProductTab.module.css";
import {SelectorComponent} from "../../../Selector/SelectorComponent";

export const DeleteProductForm = () => {

    const dispatch = useAppDispatch()
    const {product} = useAppSelector(state => state.productReducer)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(() => {
                form.resetFields();
                onFinish();
            })
            .catch((info) => {
                openNotification("Delete product", `You typed wrong confirmation ${info}`, 'error')
            });
    };

    const onFinish = () => {
        dispatch(deleteProductAction(product?.id)).then(() => {
                openNotification("Delete product", `Delete have been completed successfully.`, 'success')
                setIsModalOpen(false);
            }
        ).catch(error =>
            openNotification("Delete product", `Something went wrong. Error: ${error}`, 'error')
        )
    };

    return (
        <Col>
            <Row className={st.searchBarRow}>
                <SelectorComponent/>
            </Row>
            <Row>
                <Button type="primary" onClick={showModal}>
                    Delete product
                </Button>
            </Row>
            <Modal title="Delete product"
                   okText="Confirm"
                   cancelText="Cancel"
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}>
                <p>You really want to delete this product?</p>
                <Form
                    name="delete"
                    form={form}
                    onFinish={onFinish}
                >
                </Form>
            </Modal>
        </Col>

    )
};
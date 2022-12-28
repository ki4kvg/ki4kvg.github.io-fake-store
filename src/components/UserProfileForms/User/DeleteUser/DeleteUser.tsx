import {useAppDispatch, useAppSelector} from "../../../../Hooks/hooks";
import React, {useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import {deleteUserAction} from "../../../../store/actions/productActions";
import {openNotification} from "../../../Notification/Notification";

export const DeleteUser = () => {

    const dispatch = useAppDispatch()

    const {user} = useAppSelector(state => state.userReducer)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onFinish(values);
            })
            .catch((info) => {
                openNotification("Delete info", `You typed wrong confirmation`, 'error')
                console.log("Validate fail", info)
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        if (values.confirmation === "Yes") {
            setIsModalOpen(false);
            dispatch(deleteUserAction(user?.id)).then(res => {
                    openNotification("Delete info", `Delete have been completed successfully.`, 'success')
                }
            ).catch(error =>
                openNotification("Delete info", `Something went wrong. Error: ${error}`, 'error')
            )
        } else {
            openNotification("Delete info", `You typed wrong confirmation`, 'error')
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Delete your profile
            </Button>
            <Modal title="Delete Profile"
                   okText="Confirm"
                   cancelText="Cancel"
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}>
                <p>Type "Yes" if you really want to delete your profile.</p>
                <Form
                    name="delete"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="confirmation"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your confirmation!',
                            },
                        ]}
                    >
                        <Input placeholder="Type here..."/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};
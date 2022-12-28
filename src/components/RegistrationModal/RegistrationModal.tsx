import {Form, Input, Modal, Select,} from 'antd';
import React from 'react';
import {useAppDispatch} from "../../Hooks/hooks";
import {addUserAction} from "../../store/actions/productActions";
import {RegistrationModalType, userType} from "../../store/tsTypes";

const {Option} = Select;

const RegistrationModal = ({setIsModalRegisterOpen, isModalRegisterOpen, openNotification}: RegistrationModalType) => {

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onFinish(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalRegisterOpen(false);
    };

    const [form] = Form.useForm();

    const dispatch = useAppDispatch()


    const onFinish = (values: userType) => {
        setIsModalRegisterOpen(false)
        dispatch(addUserAction(values)).then(res => {
                openNotification("Register info", `Register have been completed successfully. New user ID is ${res.payload.id}`, 'success')
            }
        ).catch(error =>
            openNotification("Register info", `Something went wrong. Error: ${error}`, 'error')
        )
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="38">+38</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Modal title="Register"
               okText="Confirm"
               cancelText="Cancel"
               open={isModalRegisterOpen}
               onOk={handleOk}
               onCancel={handleCancel}>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {required: true,
                            message: 'Please input your username!',
                            whitespace: true
                        },
                        {
                            min: 4,
                            message: 'Username must be at least 4 characters long',
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 8,
                            message: 'Password must be at least 8 characters long',
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item label="Name">
                    <Input.Group>
                        <Form.Item
                            name={['name', 'firstname']}
                            label="Firstname"
                            tooltip="What do you want others to call you?"
                            rules={[{required: true, message: 'Please input your firstname!', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name={['name', 'lastname']}
                            label="Lastname"
                            tooltip="What do you want others to call you?"
                            rules={[{required: true, message: 'Please input your lastname!', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

                <Form.Item label="Address">
                    <Input.Group>
                        <Form.Item
                            name={['address', 'city']}
                            label="City"
                            tooltip="Please input your city!"
                            rules={[{required: true, message: 'Please input your city!', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name={['address', 'street']}
                            label="Street"
                            tooltip="Please input your street!"
                            rules={[{required: true, message: 'Please input your street!', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name={['address', 'number']}
                            label="Number"
                            rules={[{required: true, message: 'Please input number', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name={['address', 'zipcode']}
                            label="Zipcode"
                            rules={[{required: true, message: 'Please input zipcode', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name={['address', 'geolocation', 'lat']}
                            label="Geolocation latitude"
                            rules={[{required: true, message: 'Please input geolocation latitude', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name={['address', 'geolocation', 'long']}
                            label="Geolocation longitude"
                            rules={[{required: true, message: 'Please input geolocation longitude', whitespace: true}]}
                        >
                            <Input/>
                        </Form.Item>

                    </Input.Group>
                </Form.Item>

                <Form.Item

                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!'
                        },
                    ]}
                >
                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RegistrationModal;
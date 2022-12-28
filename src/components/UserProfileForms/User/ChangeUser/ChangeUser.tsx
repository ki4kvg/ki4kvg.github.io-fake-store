import {Button, Form, Input, Select} from "antd";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../Hooks/hooks";
import {updateUserAction} from "../../../../store/actions/productActions";
import {openNotification} from "../../../Notification/Notification";
import {userType} from "../../../../store/tsTypes";
import st from "./ChangeUser.module.css"

const {Option} = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{width: 70}}>
            <Option value="38">+38</Option>
        </Select>
    </Form.Item>
);

export const ChangeUser = () => {

    const [form] = Form.useForm();
    const {user} = useAppSelector(state => state.userReducer)

    const InitialValues = {
        email: user?.email,
        username: user?.username,
        password: user?.password,
        name: {
            firstname: user?.name.firstname,
            lastname: user?.name.lastname
        },
        address: {
            geolocation: {
                lat: user?.address.geolocation.lat,
                long: user?.address.geolocation.long
            },
            city: user?.address.city,
            street: user?.address.street,
            number: user?.address.number,
            zipcode: user?.address.zipcode,
        },
        phone: user?.phone
    }

    const dispatch = useAppDispatch()

    const onFinish = (values: userType) => {
        values = {
            ...values,
            id: user?.id
        }
        console.log(values)
        dispatch(updateUserAction(values)).then(res => {
                openNotification("Change user info", `You changed your info successfully`, 'success')
            }
        ).catch(error =>
            openNotification("Change user info", `Something went wrong. Error: ${error}`, 'error')
        )
    };

    return (
        <Form
            initialValues={InitialValues}
            wrapperCol={{span: 24}}
            className={st.form}
            layout={"vertical"}
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
                rules={[{required: true, message: 'Please input your username!', whitespace: true}]}
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
                <Input.Group compact>
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
                rules={[{required: true, message: 'Please input your phone number!'}]}
            >
                <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Confirm
                </Button>
            </Form.Item>
        </Form>
    )
}
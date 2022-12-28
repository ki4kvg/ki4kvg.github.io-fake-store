import {Checkbox, Form, Input, Modal} from "antd";
import st from "./LoginModal.module.css"
import {useAppDispatch} from "../../Hooks/hooks";
import {authUserAction} from "../../store/actions/productActions";
import {LoginModalType} from "../../store/tsTypes";

const LoginModal = ({setUsername, setIsModalLoginOpen, isModalLoginOpen, openNotification}: LoginModalType) => {

    const dispatch = useAppDispatch()
    const [form] = Form.useForm();

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
        setIsModalLoginOpen(false);
    };

    const onFinish = (values: any) => {
        dispatch(authUserAction(values)).then(res => {
                setUsername(values.username)
                openNotification("Login info", `You sign in successfully. Your token is ${res.payload.token}`, 'success')
                setIsModalLoginOpen(false);
            }
        ).catch(error =>
            openNotification("Login info", `Something went wrong. Error: ${error}`, 'error')
        )
    };

    return (
        <Modal title="Login"
               okText="Login"
               cancelText="Cancel"
               open={isModalLoginOpen}
               onOk={handleOk}
               onCancel={handleCancel}>
            <Form
                form={form}
                className={st.form}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                autoComplete="off"
            >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input className={st.input}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password className={st.input}/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default LoginModal;
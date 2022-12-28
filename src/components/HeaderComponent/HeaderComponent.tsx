import {Header} from "antd/es/layout/layout";
import {Button, Col, Menu, MenuProps, Row, Spin} from "antd";
import st from "./HeaderComponent.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LoginModal from "../LoginPage/LoginModal";
import {ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import {openNotification} from "../Notification/Notification";
import {getUserAction, getUserCartAction, getUsersAction} from "../../store/actions/productActions";

const items: MenuProps['items'] = [
    {
        key: '1',
        icon: null,
        label: <NavLink className={st.catalogLink} to={"/"}>Product Shop</NavLink>,
    },
]

export const HeaderComponent = () => {
    const dispatch = useAppDispatch()

    const {isLogin, isLoading} = useAppSelector(state => state.authReducer)

    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [username, setUsername] = useState('');
    const {user, users} = useAppSelector(state => state.userReducer)
    const {cart} = useAppSelector(state => state.cartReducer)

    const showLoginModal = () => {
        setIsModalLoginOpen(true);
    };

    const showRegisterModal = () => {
        setIsModalRegisterOpen(true);
    };

    const navigate = useNavigate()

    const setCurrentUser = (username: string) => {
        users?.map(async u => {
            if (u.username === username) {
                await dispatch(getUserAction(u.id))
                await dispatch(getUserCartAction(u.id))
            }
        })
    }

    useEffect(() => {
        dispatch(getUsersAction())
        setCurrentUser(username)
        console.log(cart)
    }, [username])


    return (
        <Header className={st.header}>
            <Row className={st.headerRow}>
                <LoginModal setUsername={setUsername} isModalLoginOpen={isModalLoginOpen}
                            setIsModalLoginOpen={setIsModalLoginOpen}
                            openNotification={openNotification}/>

                <RegistrationModal isModalRegisterOpen={isModalRegisterOpen}
                                   setIsModalRegisterOpen={setIsModalRegisterOpen}
                                   openNotification={openNotification}/>
                <Col>
                    <Menu
                        className={st.menu}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        items={items}
                    />
                </Col>
                <Col className={st.cartButoonBlock}>
                    {isLoading ? <Spin size={"large"} className={st.spinner}/> :
                        isLogin ?
                            <Row className={st.headerLogedInBlock}>
                                <ShoppingCartOutlined onClick={() => navigate(`/carts/user/${user?.id}`)} className={st.icon}/>
                                <UserOutlined onClick={() => navigate(`/users/${user?.id}`)} className={st.icon}/>
                            </Row>
                            :
                            <Row className={st.headerLogedOutBlock}>
                                <Button className={st.headerButton} type="primary" onClick={showLoginModal}>Sign
                                    in</Button>
                                <Button className={st.headerButton} type="primary" onClick={showRegisterModal}>Sign
                                    up</Button>
                            </Row>
                    }
                </Col>
            </Row>
        </Header>
    )
}
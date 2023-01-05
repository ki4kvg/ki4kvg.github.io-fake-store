import {Button, Col, Row} from "antd";
import st from "./SignInComponent.module.css"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {getUserAction, getUserCartAction, getUsersAction} from "../../../store/actions/productActions";
import LoginModal from "../../LoginModal/LoginModal";
import RegistrationModal from "../../RegistrationModal/RegistrationModal";
import {openNotification} from "../../Notification/Notification";
import clsx from 'clsx';

export const SignInComponent = () => {
    const dispatch = useAppDispatch()

    const {isLogin} = useAppSelector(state => state.authReducer)

    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [username, setUsername] = useState('');
    const {user, users} = useAppSelector(state => state.userReducer)


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
    }, [username])


    return (
        <Col>
            <LoginModal setUsername={setUsername} isModalLoginOpen={isModalLoginOpen}
                        setIsModalLoginOpen={setIsModalLoginOpen}
                        openNotification={openNotification}/>

            <RegistrationModal isModalRegisterOpen={isModalRegisterOpen}
                               setIsModalRegisterOpen={setIsModalRegisterOpen}
                               openNotification={openNotification}/>
            {isLogin ?
                    <Row className={st.headerLogedInBlock}>
                        <ShoppingCartOutlined onClick={() => user && navigate(`/carts/user/${user.id}`)}
                                              className={clsx(st.icon, !user && st.disabled)}/>

                        <UserOutlined onClick={() => user && navigate(`/users/${user.id}`)} className={clsx(st.icon, !user && st.disabled)}/>
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
    )
}
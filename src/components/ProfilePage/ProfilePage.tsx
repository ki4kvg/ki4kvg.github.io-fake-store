import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {Navigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {getProductsAction, getUserAction, logOutUserAction} from "../../store/actions/productActions";
import {Button, Layout, Row, Tabs} from "antd";
import {Content} from "antd/es/layout/layout";
import st from "./ProfilePage.module.css";
import {ActionsWithProducts} from "./ActionsWithProduct/ActionsWithProduct";
import {ActionsWithUser} from "./ActionsWithUser/ActionsWithUser";
import {openNotification} from "../Notification/Notification";
import {authSlice} from "../../store/reducers/authSliceReducer";
import {userSlice} from "../../store/reducers/userSliceReducer";

const items = [
    {
        label: "Add/Change/Delete product",
        children: <ActionsWithProducts/>
    },
    {
        label: "Change/Delete user",
        children: <ActionsWithUser/>
    },
]


export const ProfilePage = () => {

    const dispatch = useAppDispatch()
    const {userId} = useParams()

    const {user} = useAppSelector(state => state.userReducer)
    const {isLogin, token} = useAppSelector(state => state.authReducer)
    console.log(token)

    const logOut = () => {
        dispatch(userSlice.actions.unSetUser)
        dispatch(logOutUserAction(user))
        openNotification("Log out info", "You have been loged out successfully", 'info')
    }

    useEffect(() => {
        dispatch(getUserAction(userId))
    }, [userId])

    useEffect(() => {
        dispatch(getProductsAction())
    }, [])

    if (!isLogin) {
        return <Navigate replace to='/'/>
    }
    return (
        <Layout>
            <Content className={st.content}>
                <Row className={st.titleRow}>
                    <h1 className={st.title}>Profile of user {user?.username} </h1>
                    <Button className={st.headerButton} type="primary" onClick={logOut}>Log out</Button>
                </Row>
                <Row className={st.tabsRow}>
                    <Tabs
                        defaultActiveKey="0"
                        tabPosition="left"
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
                </Row>
            </Content>
        </Layout>
    )
};
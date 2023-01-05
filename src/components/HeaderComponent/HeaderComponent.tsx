import {Header} from "antd/es/layout/layout";
import {Col, Row} from "antd";
import st from "./HeaderComponent.module.css"
import React from "react";
import NavBar from "./NavBar/NavBar";
import {SignInComponent} from "./SignInComponent/SignInComponent";


export const HeaderComponent = () => {

    return (
        <Header className={st.header}>
            <Row className={st.headerRow}>
                <Col span={2}>
                    <NavBar/>

                </Col>
                <SignInComponent/>
            </Row>
        </Header>
    )
}
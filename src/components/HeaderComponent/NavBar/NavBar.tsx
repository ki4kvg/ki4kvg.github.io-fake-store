import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import st from "./NavBar.module.css";
import {RadioGroupComponent} from "../../RadioGroupCategories/RadioGroupComponent";
import { NavLink } from "react-router-dom";
import {Col} from "antd";

const NavBar = () => {
    const [visible, setVisible] = useState(false);

    return (
        <nav className={st.navbar}>
            <Col className={st.linkCol}>
                <NavLink className={st.catalogLinkMain} to={"/"}>Product Shop</NavLink>
            </Col>
            <Col span={1}>
                <Button
                className={st.menu}
                type="primary"
                icon={<MenuOutlined className={st.menuIcon}/>}
                onClick={() => setVisible(true)}
            />
            </Col>
            <Drawer
                className={st.drawer}
                title="Sider Menu"
                placement="left"
                onClose={() => setVisible(false)}
                open={visible}
            >
                {
                    <>
                        <Col span={24}>
                            <NavLink className={st.catalogLinkDrawer} to={"/"}>Product Shop</NavLink>
                        </Col>
                        <RadioGroupComponent/>
                    </>
                }
            </Drawer>
        </nav>
    );
};
export default NavBar;
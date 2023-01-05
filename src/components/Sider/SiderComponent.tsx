import {Layout} from "antd";
import React from "react";
import st from "./SiderComponent.module.css"
import {RadioGroupComponent} from "../RadioGroupCategories/RadioGroupComponent";

export const SiderComponent = () => {

    return (
        <Layout.Sider className={st.sider}
                      breakpoint={"lg"}
                      collapsedWidth={0}
                      trigger={null}>
            {<RadioGroupComponent/>}
        </Layout.Sider>
    )
}
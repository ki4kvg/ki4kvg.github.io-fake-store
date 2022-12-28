import st from "./Spinner.module.css"
import React from "react";
import {Spin} from "antd";

export const Spinner = () => {
    return (
        <Spin size={"large"} className={st.spinner}/>
    )
}
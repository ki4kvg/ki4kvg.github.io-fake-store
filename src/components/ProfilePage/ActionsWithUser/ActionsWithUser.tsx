import React from "react";
import {Tabs} from "antd";
import {ChangeUser} from "../../UserProfileForms/User/ChangeUser/ChangeUser";
import {DeleteUser} from "../../UserProfileForms/User/DeleteUser/DeleteUser";

const items = [
    {
        label: "Change user",
        children: <ChangeUser/>
    },
    {
        label: "Delete user",
        children: <DeleteUser/>
    },
]

export const ActionsWithUser = () => {
    return (
        <Tabs
            defaultActiveKey="0"
            tabPosition="top"
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
    )
}
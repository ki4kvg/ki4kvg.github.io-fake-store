import React from "react";
import {Tabs} from "antd";
import {ChangeUser} from "../UsersActionForm/ChangeUser/ChangeUser";
import {DeleteUser} from "../UsersActionForm/DeleteUser/DeleteUser";

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

export const UserTabs = () => {
    return (
        <Tabs
            defaultActiveKey="0"
            tabPosition="top"
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
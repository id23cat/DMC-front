import React from "react";

interface Props {
    icon: string;
}

export const icons = {
    account: "account_box",
    add: "add",
};

export const Icon = ({ icon }: Props) => {
    return <i className="material-icons">{icon}</i>;
};

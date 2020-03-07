import React from "react";

export interface IconProps {
    icon: typeof icons[keyof typeof icons];
}

export const icons = {
    account: "account_circle",
    add: "add",
    error: "error_outline",
    delete: "delete_forever",
    close: "close",
    contextMenuOpen: "arrow_right",
} as const;

export const Icon = ({ icon }: IconProps) => {
    return <i className="material-icons">{icon}</i>;
};

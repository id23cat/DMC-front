import { Input } from "reactstrap";
import React from "react";
import { ControlProps } from "./index";

export type InputControlValue = string | undefined;

export interface InputControlProps extends ControlProps<InputControlValue> {
    className?: string;
    type?: "password" | "text" | "email";
    valid?: boolean;
}

export const InputControl = ({ onChange, value, className, type, valid }: InputControlProps) => {
    return (
        <Input
            invalid={valid === undefined ? undefined : !valid}
            valid={valid}
            type={type || "text"}
            className={className}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
        />
    );
};

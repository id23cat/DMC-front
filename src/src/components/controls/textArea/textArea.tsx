import { ControlProps } from "../index";
import React, { useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";

export interface TextAreaProps extends ControlProps<string | undefined> {
    className?: string;
    minRows?: number;
}

export const TextArea = ({ value, onChange, valid, className, minRows }: TextAreaProps) => {
    const validationClass = valid === undefined ? "" : valid ? "is-valid" : "is-invalid";
    const handler = useCallback(e => onChange(e.target.value), [onChange]);

    return (
        <TextareaAutosize
            minRows={minRows || 3}
            className={`form-control ${validationClass} ${className || ""}`}
            value={value || ""}
            onChange={handler}
        />
    );
};

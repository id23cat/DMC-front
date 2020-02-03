import { FilesDropzone, FileUploaderProps } from "./filesDropzone/filesDropzone";
import { ControlProps } from "../index";
import React from "react";

export type SingleFileUploaderProps =
    Omit<FileUploaderProps, "value" | "onChange" | "multiple">
    & ControlProps<File | undefined>

export const SingleFileUploader = ({ value, onChange, ...rest }: SingleFileUploaderProps) => {
    return (
        <FilesDropzone
            {...rest}
            onChange={files => onChange(files[0])}
            value={value ? [value] : []}
        />
    );
};

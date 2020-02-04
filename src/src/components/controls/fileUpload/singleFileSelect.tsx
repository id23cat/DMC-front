import { FilesDropzone, FileUploaderProps } from "./filesDropzone/filesDropzone";
import { ControlProps } from "../index";
import React from "react";

export type SingleFileSelectProps = ControlProps<File | undefined> & Omit<FileUploaderProps, "onChange" | "multiple">;

export const SingleFileSelect = ({ value, onChange, ...rest }: SingleFileSelectProps) => {
    return (
        <FilesDropzone
            {...rest}
            multiple={false}
            onChange={files => onChange(files[0])}
        />
    );
};

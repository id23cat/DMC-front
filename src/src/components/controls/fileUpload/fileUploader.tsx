import React from "react";
import { ControlProps } from "../index";

export interface FileUploaderProps extends ControlProps<Array<File>> {
    multiple?: boolean;
    accept?: string | Array<string>;
}

export const FileUploader = ({ onChange, multiple, accept }: FileUploaderProps) => {
    return (
        <input
            type="file"
            multiple={multiple}
            accept={accept && Array.isArray(accept) ? accept.join(",") : accept}
            onChange={e => onChange(Array.from(e.target.files || []))} />
    );
};

import React from "react";
import { useDropzone } from "react-dropzone";
import { Local } from "../../../../core/localization/local";

export interface FileUploaderProps {
    multiple?: boolean;
    accept?: string | Array<string>;
    onChange: (files: Array<File>) => void;
}

export const FilesDropzone = ({ onChange, ...rest }: FileUploaderProps) => {
    const { getRootProps, getInputProps } = useDropzone({
        ...rest,
        onDrop: onChange,
    });

    return (
        <div {...getRootProps()} className="files-dropzone">
            <input {...getInputProps()} />
            <span>
                <Local id="DrugOrClickToSelectFile" />
            </span>
        </div>
    );
};

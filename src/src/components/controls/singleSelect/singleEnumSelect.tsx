import { SingleSelect, SingleSelectProps } from "./singleSelect";
import React, { useMemo } from "react";
import { SelectItem } from "../multiSelect/multiSelect";
import { enumLocal } from "../../../core/localization/local";

export interface SingleEnumSelectProps extends Omit<SingleSelectProps, "options"> {
    enumObject: any;
}

export const SingleEnumSelect = ({ enumObject, ...rest }: SingleEnumSelectProps) => {
    const options = useMemo<Array<SelectItem<string>>>(
        () =>
            Object.keys(enumObject).map(i => ({
                text: enumLocal(enumObject, i),
                value: i,
            })),
        [enumObject],
    );

    return <SingleSelect<string> {...rest} options={options} />;
};

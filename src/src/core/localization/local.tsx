import { FormattedMessage } from "react-intl";
import { KeyOrJSX } from "../../typings/customTypings";
import React from "react";
import { localStore } from "../../stores/localStore";

interface Props {
    id: string;
    values?: any;
}

interface EnumLocalProps {
    enumObject: any;
    value: string;
}

const enumNameKey = Symbol("enum_name_key");

export const Local = (props: Props) => <FormattedMessage {...props} />;
export const EnumLocal = ({ enumObject, value }: EnumLocalProps) =>
    <Local id={getEnumKey(enumObject, value)} />;

export const enumLocal = (enumObject: any, value: string): string =>
    localStore.getLocalizedMessage(getEnumKey(enumObject, value));

function getEnumKey(enumObject: any, value: string): string {
    const enumName = enumObject[enumNameKey];

    if (!enumName) {
        throw new Error("You should first register enum via enumeration function");
    }

    return enumName + "_" + value;
}

export const ensureLocal = (value?: KeyOrJSX) => {
    return typeof value === "string" ? <Local id={value} /> : value;
};

export function enumeration(enumObject: any, name: string) {
    if (enumObject[enumNameKey]) {
        throw new Error(`You already registered this enumeration ${name}`);
    }

    enumObject[enumNameKey] = name;
}

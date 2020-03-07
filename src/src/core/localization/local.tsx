import { FormattedMessage } from "react-intl";
import { KeyOrJSX } from "../../typings/customTypings";
import React from "react";
import { localStore } from "../../stores/localStore";

interface Props {
    id: string;
    values?: any;
}

interface EnumLocalProps<TEnum extends string> {
    enumObject: TEnum;
    value: keyof TEnum;
}

const enumNameKey = Symbol("enum_name_key");

export const Local = (props: Props) => <FormattedMessage {...props} />;
export const EnumLocal = <TEnum extends string>({ enumObject, value }: EnumLocalProps<TEnum>) => (
    <Local id={getEnumKey(enumObject, value)} />
);

export const enumLocal = (enumObject: any, value: string): string =>
    localStore.getLocalizedMessage(getEnumKey(enumObject, value));

function getEnumKey<TEnum>(enumObject: TEnum, value: keyof TEnum): string {
    const enumName = (enumObject as any)[enumNameKey];

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

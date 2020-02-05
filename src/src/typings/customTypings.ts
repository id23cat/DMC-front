import React from "react";

export type Dictionary<TValue = object> = { [key: string]: TValue };

export type KeyOrJSX = string | React.ReactNode;

export type Color = "primary" | "secondary";

export interface IdParams {
    id?: string;
}

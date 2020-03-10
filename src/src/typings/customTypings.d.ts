import React from "react";

type Dictionary<TValue = object> = { [key: string]: TValue };

type KeyOrJSX = string | React.ReactNode;

type Color = "primary" | "secondary";

interface IdParams {
  id?: string;
}

interface PropsWithStore<TStore> {
  store: TStore;
}

interface Disposable {
  dispose: () => void;
}

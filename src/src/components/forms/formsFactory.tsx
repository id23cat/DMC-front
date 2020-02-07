import React from "react";
import { ResponsiveWrapper } from "../layouts/responsiveWrapper";
import { FormControlProps } from "./formControls";
import { InputControlProps } from "../controls/inputControl";
import { FormInput } from "./index";
import { Observer } from "mobx-react-lite";

interface FormFactoryControlProps<TStore> {
    store: TStore;
}

export class FormsFactory<TStore> {
    public controls: Array<React.FC<FormFactoryControlProps<TStore>>> = [];

    public static new<TStore>() {
        return new FormsFactory<TStore>();
    }

    public inResponsiveWrapper = (
        colsInRow: number,
        builder: (factory: FormsFactory<TStore>) => void,
    ): FormsFactory<TStore> => {
        const factory = new FormsFactory<TStore>();
        builder(factory);
        this.controls.push(({ store }: FormFactoryControlProps<TStore>) => (
            <ResponsiveWrapper colsInRow={colsInRow}>
                {factory.controls.map((Control, index) => (
                    <Control key={index} store={store} />
                ))}
            </ResponsiveWrapper>
        ));

        return this;
    };

    public input = (
        label: string,
        valueAccessor: (store: TStore) => string | undefined,
        onChange: (store: TStore) => (value?: string | undefined) => void,
        options?: (store: TStore) => Partial<FormControlProps<string | undefined, InputControlProps>>,
    ): FormsFactory<TStore> => {
        this.pushControl<FormControlProps<string | undefined, InputControlProps>>(FormInput, store => ({
            ...(options ? options(store) : {}),
            label: label,
            value: valueAccessor(store),
            onChange: onChange(store),
        }));

        return this;
    };

    public build = (): React.FC<FormFactoryControlProps<TStore>> => {
        return ({ store }: FormFactoryControlProps<TStore>) => (
            <>
                {this.controls.map((Control, index) => <Control key={index} store={store} />)}
            </>
        );
    };

    private pushControl = <TProps extends any>(
        Control: React.FC<TProps>,
        options: (store: TStore) => TProps,
    ): FormsFactory<TStore> => {
        this.controls.push(
            ({ store }: FormFactoryControlProps<TStore>) => (
                <Observer>
                    {() => <Control {...(options(store))} />}
                </Observer>
            ),
        );

        return this;
    };
}

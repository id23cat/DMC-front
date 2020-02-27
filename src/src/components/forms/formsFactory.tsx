import React from "react";
import { ResponsiveWrapper } from "../layouts/responsiveWrapper";
import { FormControlProps } from "./formControls";
import { InputControlProps, InputControlValue } from "../controls/inputControl";
import { FormInput } from "./index";
import { Observer } from "mobx-react-lite";
import { ValidationFunction } from "./validations";

interface FormFactoryControlProps<TStore> {
    store: TStore;
}

type StoreProps<TStore, TValue> = (store: TStore) => TValue;

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
        valueAccessor: StoreProps<TStore, InputControlValue>,
        onChange: StoreProps<TStore, (value?: InputControlValue) => void>,
        validations?: StoreProps<TStore, Array<ValidationFunction<InputControlValue>>>,
        options?: (store: TStore) => Partial<FormControlProps<InputControlValue, InputControlProps>>,
    ): FormsFactory<TStore> => {
        this.pushControl<FormControlProps<InputControlValue, InputControlProps>>(FormInput, store => ({
            label: label,
            value: valueAccessor(store),
            onChange: onChange(store),
            validations: validations && validations(store),
            ...(options && options(store)),
        }));

        return this;
    };

    public build = (): React.FC<FormFactoryControlProps<TStore>> => {
        return ({ store }: FormFactoryControlProps<TStore>) => (
            <>
                {this.controls.map((Control, index) => (
                    <Control key={index} store={store} />
                ))}
            </>
        );
    };

    private pushControl = <TProps extends any>(
        Control: React.FC<TProps>,
        options: (store: TStore) => TProps,
    ): FormsFactory<TStore> => {
        this.controls.push(({ store }: FormFactoryControlProps<TStore>) => (
            <Observer>{() => <Control {...options(store)} />}</Observer>
        ));

        return this;
    };
}

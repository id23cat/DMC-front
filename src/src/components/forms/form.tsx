import React, { FormEvent, PropsWithChildren, useCallback, useRef } from "react";
import { Form as FormComponent } from "reactstrap";
import { ValidationProvider } from "./validationProvider";

interface Props {
    onValidSubmit?: () => void;
}

export const Form = (
    {
        onValidSubmit,
        children,
    }: PropsWithChildren<Props>,
) => {
    const validationProvider = useRef<ValidationProvider>(null);

    const submit = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (validationProvider.current!.validate()) {
            onValidSubmit && onValidSubmit();
        }
    }, [onValidSubmit]);

    return (
        <FormComponent onSubmit={submit}>
            <ValidationProvider ref={validationProvider}>
                {children}
            </ValidationProvider>
        </FormComponent>
    );
};


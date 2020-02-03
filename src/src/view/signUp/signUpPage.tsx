import { Form } from "../../components/forms/form";
import React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { SignUpPageStore } from "./signUpPageStore";

export const SignUpPage = observer(() => {
    const store = useLocalStore(() => new SignUpPageStore());

    return (
        <Form onValidSubmit={store.submit}>
        </Form>
    );
});


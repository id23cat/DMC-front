import { Form } from "../../components/forms/form";
import React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { SignUpPageStore } from "./signUpPageStore";
import { required } from "../../components/forms/validations";
import { Button } from "reactstrap";
import { Local } from "../../core/localization/local";
import { FormsFactory } from "../../components/forms/formsFactory";

const FormFieldsControl = FormsFactory
    .new<SignUpPageStore>()
    .input("Login", store => store.username, store => store.setUsername, _ => [required])
    .input("Password", store => store.password, store => store.setPassword, undefined, store => ({
        type: "password",
        validations: [required, store.passwordsShouldBeEqual],
    }))
    .input("ConfirmPassword", store => store.confirmPassword, store => store.setConfirmPassword, undefined, store => ({
        type: "password",
        validations: [required, store.passwordsShouldBeEqual],
    }))
    .build();

export const SignUpPage = observer(() => {
    const store = useLocalStore(() => new SignUpPageStore());

    return (
        <Form onValidSubmit={store.submit}>
            <FormFieldsControl store={store} />
            <Button color="primary">
                <Local id="SignUp" />
            </Button>
        </Form>
    );
});

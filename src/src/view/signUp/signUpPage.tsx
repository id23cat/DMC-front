import { Form } from "../../components/forms/form";
import React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { SignUpPageStore } from "./signUpPageStore";
import { FormInput } from "../../components/forms";
import { required } from "../../components/forms/validations";
import { Button } from "reactstrap";
import { Local } from "../../core/localization/local";

export const SignUpPage = observer(() => {
    const store = useLocalStore(() => new SignUpPageStore());

    return (
        <Form onValidSubmit={store.submit}>
            <FormInput
                label="Login"
                type="email"
                onChange={store.setLogin}
                value={store.login}
                validations={[required]} />
            <FormInput
                label="Password"
                type="password"
                onChange={store.setPassword}
                value={store.password}
                validations={[required, store.passwordsShouldBeEqual]} />
            <FormInput
                label="ConfirmPassword"
                type="password"
                onChange={store.setConfirmPassword}
                value={store.confirmPassword}
                validations={[required, store.passwordsShouldBeEqual]} />
            <Button color="primary">
                <Local id="SignUp" />
            </Button>
        </Form>
    );
});


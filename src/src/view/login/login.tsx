import { observer, useLocalStore } from "mobx-react-lite";
import { LoginStore } from "./loginStore";
import React from "react";
import { Col, Row, Button } from "reactstrap";
import { Local } from "../../core/localization/local";
import { required } from "../../components/forms/validations";
import { Form } from "../../components/forms/form";
import { routingStore } from "../../stores/routingStore";
import { LinkButton } from "../../components/buttons/linkButton";
import { FormsFactory } from "../../components/forms/formsFactory";

const FormFieldsControl = FormsFactory
    .new<LoginStore>()
    .input("Login", store => store.username, store => store.setLogin, _ => ({
        validations: [required],
    }))
    .input("Password", store => store.password, store => store.setPassword, _ => ({
        type: "password",
        validations: [required],
    }))
    .build();

export const Login = observer(() => {
    const store = useLocalStore(() => new LoginStore());

    return (
        <Row>
            <Col>
                <Form onValidSubmit={store.signIn}>
                    <FormFieldsControl store={store} />
                    <Button color="primary">
                        <Local id="SignIn" />
                    </Button>
                    <LinkButton onClick={() => routingStore.goto("/signUp")} title="SignUp" />
                </Form>
            </Col>
        </Row>
    );
});

import { CardSectionsGroup } from "../../components/layouts/sections/cardSectionsGroup";
import React from "react";
import { CardSection } from "../../components/layouts/sections/cardSection";
import { Form } from "../../components/forms/form";
import { observer, useLocalStore } from "mobx-react-lite";
import { UserAccountStore } from "./userAccountStore";
import { FormsFactory } from "../../components/forms/formsFactory";

const FormFieldsControl = FormsFactory.new<UserAccountStore>()
    .inResponsiveWrapper(3, factory =>
        factory.input(
            "Account_Username",
            store => store.username,
            store => value => (store.username = value),
        ),
    )
    .build();

export const UserAccountPage = observer(() => {
    const store = useLocalStore(() => new UserAccountStore());

    return (
        <Form>
            <CardSectionsGroup
                topActions={[
                    {
                        title: "Save",
                        color: "primary",
                    },
                ]}
            >
                <CardSection title="MyAccount">
                    <FormFieldsControl store={store} />
                </CardSection>
            </CardSectionsGroup>
        </Form>
    );
});

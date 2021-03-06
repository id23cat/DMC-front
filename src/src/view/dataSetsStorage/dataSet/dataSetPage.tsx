import { observer, useLocalStore } from "mobx-react-lite";
import { DataSetPageStore } from "./dataSetPageStore";
import React from "react";
import { IdParams } from "../../../typings/customTypings";
import { useParams } from "react-router-dom";
import { CardSectionActionConfigs, CardSectionsGroup } from "../../../components/layouts/sections/cardSectionsGroup";
import { CardSection } from "../../../components/layouts/sections/cardSection";
import { Form } from "../../../components/forms/form";
import useAsyncEffect from "use-async-effect";
import { routingStore } from "../../../stores/routingStore";
import { FormInput, FormSingleFileSelect } from "../../../components/forms";
import { required } from "../../../components/forms/validations";
import { DataSetColumn } from "./dataSetColumn";
import { Col, ListGroup, Row } from "reactstrap";

const actions: Array<CardSectionActionConfigs> = [
    {
        title: "Cancel",
        onClick: () => routingStore.goto("/data-sets"),
    },
    {
        title: "Save",
        color: "primary",
    },
];

export const DataSetPage = observer(() => {
    const params = useParams<IdParams>();
    const store = useLocalStore(() => new DataSetPageStore(params.id));
    useAsyncEffect(store.loadData, []);

    return (
        <Form onValidSubmit={store.save}>
            <CardSectionsGroup topActions={actions}>
                <CardSection title="DataSet_GeneralInfo">
                    <Row>
                        <Col>
                            <FormInput
                                label="DataSet_Name"
                                value={store.name}
                                onChange={store.setName}
                                validations={[required]}
                            />
                        </Col>
                        <Col>
                            <FormSingleFileSelect
                                label="DataSet_DataSet"
                                value={store.file}
                                onChange={store.setFile}
                                validations={[required]}
                            />
                        </Col>
                    </Row>
                </CardSection>
                <CardSection title="DataSet_Columns">
                    <ListGroup>
                        {store.columns.map((s, index) => (
                            <DataSetColumn key={index} store={s} />
                        ))}
                    </ListGroup>
                </CardSection>
            </CardSectionsGroup>
        </Form>
    );
});

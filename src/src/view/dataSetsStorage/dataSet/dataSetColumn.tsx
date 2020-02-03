import React from "react";
import { DataSetColumnStore } from "./dataSetColumnStore";
import { observer } from "mobx-react-lite";
import { Col, ListGroupItem, Row } from "reactstrap";
import { FormInput, FormSingleEnumSelect } from "../../../components/forms";
import { DataSetValueType } from "./dataSetValueType";
import { enumeration } from "../../../core/localization/local";
import { required } from "../../../components/forms/validations";

interface Props {
    store: DataSetColumnStore;
}

export const DataSetColumn = observer(({ store }: Props) => {
    return (
        <ListGroupItem>
            <Row>
                <Col>
                    <FormSingleEnumSelect
                        label="DataSet_ColumnType"
                        enumObject={DataSetValueType}
                        value={store.type}
                        onChange={store.setType}
                        validations={[required]}
                    />
                </Col>
                <Col>
                    <FormInput
                        label="DataSet_ColumnName"
                        value={store.name}
                        onChange={store.setName}
                        validations={[required]}
                    />
                </Col>
            </Row>
        </ListGroupItem>
    );
});

enumeration(DataSetValueType, "DataSetValueType");


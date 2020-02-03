import React, { useState } from "react";
import { CardSectionActionConfigs, CardSectionsGroup } from "../../components/layouts/sections/cardSectionsGroup";
import { CardSection } from "../../components/layouts/sections/cardSection";
import { ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import useAsyncEffect from "use-async-effect";
import { routingStore } from "../../stores/routingStore";

const actions: Array<CardSectionActionConfigs> = [
    {
        title: "DataSetsStorage_AddNewDataSet",
        onClick: () => routingStore.goto("/data-sets/add"),
        color: "primary",
    },
];

export const DataSetsStorageListPage = () => {
    const [dataItems, setDataItems] = useState<Array<DataSetListItem>>([]);

    useAsyncEffect(async () => {
        // TODO: stub
        setDataItems(["First item", "Second item"].map((title, i) => ({ id: i.toString(), title })));
    }, []);

    return (
        <CardSectionsGroup topActions={actions}>
            <CardSection title="YourDataSets">
                <ListGroup>
                    {dataItems.map((d, index) => (
                        <ListGroupItem
                            className="clickable"
                            key={index}
                            onClick={() => routingStore.goto(`/data-sets/${d.id}`)}>
                            <ListGroupItemHeading>{d.title}</ListGroupItemHeading>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </CardSection>
        </CardSectionsGroup>
    );
};

interface DataSetListItem {
    id: string;
    title: string;
}

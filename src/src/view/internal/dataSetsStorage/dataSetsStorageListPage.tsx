import React, { useState } from "react";
import { CardSectionsGroup } from "../../../components/layouts/sections/cardSectionsGroup";
import { CardSection } from "../../../components/layouts/sections/cardSection";
import { ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import useAsyncEffect from "use-async-effect";
import { routingStore } from "../../../stores/routingStore";

export const DataSetsStorageListPage = () => {
    const [dataItems, setDataItems] = useState<Array<DataSetListItem>>([]);

    useAsyncEffect(async () => {
        // TODO: stub
        setDataItems(["First item", "Second item"].map((title, i) => ({ id: i.toString(), title })));
    }, []);

    return (
        <CardSectionsGroup>
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

import React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { AlgorithmsConstructorStore } from "./algorithmsConstructorStore";
import { IdParams } from "../../../typings/customTypings";
import { useParams } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import { Form } from "../../../components/forms/form";
import { AlgorithmsConstructorSidebar } from "./algorithmsConstructorSidebar";
import { useLayoutClassName } from "../../../hooks/useLayoutClassName";

export const AlgorithmsConstructorPage = observer(() => {
    useLayoutClassName("algorithms-constructor-page");
    const params = useParams<IdParams>();
    const store = useLocalStore(() => new AlgorithmsConstructorStore(params.id));
    useAsyncEffect(store.loadData, []);

    return (
        <div className="algorithms-constructor">
            <Form>
                <AlgorithmsConstructorSidebar store={store} />
            </Form>
        </div>
    );
});

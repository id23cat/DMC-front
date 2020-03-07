import React, { useRef } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { AlgorithmsConstructorContextStore } from "./algorithmsConstructorContextStore";
import { useParams } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import { Form } from "../../../components/forms/form";
import { AlgorithmsConstructorInstrumentsSidebar } from "./instrumentsSidebar/algorithmsConstructorInstrumentsSidebar";
import { useLayoutClassName } from "../../../hooks/useLayoutClassName";
import { Layer, Stage } from "react-konva";
import { IdParams } from "../../../typings/customTypings";
import { BaseAlgorithmBlock } from "./blocks/baseAlgorithmBlock";
import { AlgorithmsConstructorContextSidebar } from "./contextSidebar/algorithmsConstructorContextSidebar";

export const AlgorithmsConstructorContext = React.createContext<AlgorithmsConstructorContextStore | undefined>(
    undefined,
);

export const AlgorithmsConstructorPage = observer(() => {
    useLayoutClassName("algorithms-constructor-page");
    const params = useParams<IdParams>();
    const ref = useRef<Stage>(null);
    const store = useLocalStore(() => new AlgorithmsConstructorContextStore(params.id));
    useAsyncEffect(store.loadData, []);

    return (
        <div className="algorithms-constructor">
            <Form className="w-100">
                <div className="d-flex">
                    <AlgorithmsConstructorInstrumentsSidebar store={store} />
                    <Stage ref={ref} width={3000} height={3000} className="work-table">
                        <AlgorithmsConstructorContext.Provider value={store}>
                            <Layer>
                                {store.blocks.map((b, index) => (
                                    <BaseAlgorithmBlock key={index} store={b} />
                                ))}
                            </Layer>
                        </AlgorithmsConstructorContext.Provider>
                    </Stage>
                    <AlgorithmsConstructorContextSidebar store={store} />
                </div>
            </Form>
        </div>
    );
});

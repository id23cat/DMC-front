import { Arrow } from "react-konva";
import { PropsWithStore } from "../../../../../typings/customTypings";
import { observer } from "mobx-react-lite";
import React from "react";
import { AlgorithmBlockConnectionStore } from "./algorithmBlockConnectionStore";

export const AlgorithmBlocksConnection = observer(
    ({ store: { from, to } }: PropsWithStore<AlgorithmBlockConnectionStore>) => {
        return (
            <Arrow
                points={[from.absoluteX, from.absoluteY, to.absoluteX, to.absoluteY]}
                strokeWidth={4}
                stroke="black"
                fill="black"
            />
        );
    },
);

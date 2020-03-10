import { Arrow } from "react-konva";
import { PropsWithStore } from "../../../../../typings/customTypings";
import { observer } from "mobx-react-lite";
import React from "react";
import { AlgorithmBlockConnection } from "./algorithmBlockConnection";

export const AlgorithmBlocksConnection = observer(
    ({ store: { from, to } }: PropsWithStore<AlgorithmBlockConnection>) => {
        if (from.block == null || to.block == null) {
            return null;
        }

        return (
            <Arrow
                points={[from.block.x, from.block.y, to.block.x, to.block.y]}
                strokeWidth={4}
                stroke="black"
                fill="black"
            />
        );
    },
);

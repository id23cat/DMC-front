import { Arrow } from "react-konva";
import { observable } from "mobx";
import { BaseAlgorithmBlockStore } from "../baseAlgorithmBlockStore";
import { PropsWithStore } from "../../../../../typings/customTypings";
import { observer } from "mobx-react-lite";
import React from "react";

type Props = PropsWithStore<AlgorithmBlockConnection>;

export const AlgorithmBlocksConnection = observer(({ store: { from, to } }: Props) => {
    if (from.block == null || to.block == null) {
        return null;
    }

    return <Arrow points={[from.block.x, from.block?.y, to.block.x, to.block.y]} />;
});

export class AlgorithmBlockConnection {
    @observable public from: Connection;
    @observable public to: Connection;

    constructor(from: Connection, to: Connection) {
        this.from = from;
        this.to = to;
    }
}

export class Connection {
    @observable public block?: BaseAlgorithmBlockStore;
    /**
     * Generally name of variable
     */
    @observable public contract: string;

    constructor(contract: string, block?: BaseAlgorithmBlockStore) {
        this.block = block;
        this.contract = contract;
    }
}

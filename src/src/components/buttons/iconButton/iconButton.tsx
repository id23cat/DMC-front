import { Button } from "reactstrap";
import { Icon, IconProps } from "../../icons/icon";
import React from "react";
import { Color } from "../../../typings/customTypings";

export interface IconButtonProps extends Pick<IconProps, "icon"> {
    color?: Color;
    onClick: () => void;
}

export const IconButton = ({ icon, onClick, color }: IconButtonProps) => {
    return (
        <Button color={color} onClick={onClick}>
            <Icon icon={icon} />
        </Button>
    );
};

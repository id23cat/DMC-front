import React, { useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { KeyOrJSX, PropsWithStore } from "../../typings/customTypings";
import { ensureLocal } from "../../core/localization/local";
import { ContextMenuManager } from "./contextMenuManager";
import { ContextMenuTrigger, ContextMenu, MenuItem, SubMenu } from "react-contextmenu";
import { uniqId } from "../../core/utils/uniqIdUtil";
import { Icon, icons } from "../icons/icon";

type Props = PropsWithStore<ContextMenuManager>;

export type MenuOption = MenuItemOption | SubMenuItemOption;

interface MenuItemOption {
    title: KeyOrJSX;
    onClick: () => void;
}

interface SubMenuItemOption {
    title: KeyOrJSX;
    subMenu: Array<MenuItemOption>;
}

export const ContextMenuComponent = observer(({ store }: Props) => {
    const ref = useRef<typeof ContextMenuTrigger>(null);
    const id = useMemo(() => uniqId("context-menu"), []);
    useEffect(() => {
        store.ref = ref;
    });

    return (
        <>
            <ContextMenuTrigger ref={ref as any} id={id} />
            <ContextMenu id={id} className="context-menu">
                {store.options.map(mapMenuOption)}
            </ContextMenu>
        </>
    );
});

const mapMenuOption = (opt: MenuOption, index: number) => {
    if ("subMenu" in opt) {
        return (
            <SubMenu
                key={index}
                title={
                    <div className="submenu-main-item">
                        <span>{ensureLocal(opt.title)}</span>
                        <Icon icon={icons.contextMenuOpen} />
                    </div>
                }
                className="context-menu"
            >
                {opt.subMenu.map(mapMenuOption)}
            </SubMenu>
        );
    } else {
        return (
            <MenuItem key={index} onClick={opt.onClick} className="menu-option">
                {ensureLocal(opt.title)}
            </MenuItem>
        );
    }
};

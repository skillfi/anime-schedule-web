import React, {CSSProperties} from "react";

interface Class {
    name?: string;
}

interface Element {
    name?: string;
    react?: JSX.Element;
}
export interface Style {
    class?: Class | boolean;
    element?: Element | boolean;
    menuitem?: boolean;
    admin_panel?: boolean;
    edit_profile?: boolean;
    sign_out?: boolean;
    items?: any;
    anchorElNav?: null | HTMLElement;
    anchorElUser?: null | HTMLElement;
}

export interface MenuHeader {
    user?: any
}

export interface Menu {
    menu_item?: string;
    items?: JSX.Element;

    opacity?: string | number;
}
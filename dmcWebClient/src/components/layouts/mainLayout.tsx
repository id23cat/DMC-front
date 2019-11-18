import React, { ReactNode } from "react";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

interface Props {
    children: ReactNode;
}

export const MainLayout = (props: Props) => {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    );
};

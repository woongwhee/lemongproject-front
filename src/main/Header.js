import React from 'react';
import MainMenu from "./MainMenu";

const Header = () => {
    return (
        <header className="header">
            <img src="/LemongImg/CommonImg/LemongLogo.png"/>
            <MainMenu/>
        </header>
    );
};

export default Header;

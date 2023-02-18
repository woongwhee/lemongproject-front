import React from 'react';
import MainMenu from "./MainMenu";
import MainMenuBar from "./menubar/MainMenuBar";

const Header = () => {
    return (
        <header className="header">
            <img src="/LemongImg/CommonImg/LemongLogo.png"/>
            <MainMenuBar/>
        </header>
    );
};

export default Header;

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const NavBarMobile = () => {
    // menu
        const [dropMenu, setDropMenu] = useState(false);
        const closeTimeout = useRef(null);
    
        const handleDropMenu = (e) => {
            e.preventDefault();
            if (closeTimeout.current) clearTimeout(closeTimeout.current); 
            setDropMenu(true);
        };
        const handleMouseLeave = () => {
            closeTimeout.current = setTimeout(() => {
                setDropMenu(false);
            }, 2000);
        };
        const handleMouseEnter = () => {
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
        };

    return (<>
        <a href="#firstSection">
            <Image src="/logoMobile.png" alt="Logo" width={36} height={40} id="navLogoMobile"/>
        </a>
        <div id="navMenuMobileContainer">
            <button style={{opacity: dropMenu ? '0' : '1'}} onClick={handleDropMenu} onMouseOut={handleMouseLeave} onMouseOver={handleMouseEnter} id="navMenuMobileButton">MENÚ</button>
            <div style={{right: dropMenu ? -13 : -410}} id="navLinksMobile">
                <a href="#turneraContainer" className="navLinkMobile">RESERVAS</a>
                <a href="#thirdSectionMobile" className="navLinkMobile">ESTUDIO</a>
                <a href="#sixthSection" className="navLinkMobile">NOSOTROS</a>
                <a href="#eighthSection" className="navLinkMobile">CONTACTO</a>
            </div>
        </div>
    </>)
}
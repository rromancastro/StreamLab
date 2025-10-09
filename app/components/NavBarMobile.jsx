"use client";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import {useRef, useState } from "react";

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

    const {scrollYProgress} = useScroll();
    const [isWhite, setIsWhite] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsWhite((latest >= 0.15 && latest < 0.33) || (latest >= 0.54 && latest < 0.675) || (latest >= 0.455 && latest < 0.505));
    });

    return (<>
        <a href="#firstSection">
            <Image style={{filter: `invert(${isWhite ? '1' : '0'})`, transition: '.5s'}} src="/logoMobile.png" alt="Logo" width={36} height={40} id="navLogoMobile"/>
        </a>
        <div id="navMenuMobileContainer">
            <button style={{opacity: dropMenu ? '0' : '1', color: isWhite ? '#ffffff' : '#0A001A'}} onClick={handleDropMenu} onMouseOut={handleMouseLeave} onMouseOver={handleMouseEnter} id="navMenuMobileButton">MENÚ</button>
            <div style={{right: dropMenu ? -13 : -410}} id="navLinksMobile">
                <a href="#turneraContainer" style={{color: isWhite ? '#ffffff' : '#0A001A'}} className="navLinkMobile">RESERVAS</a>
                <a href="#thirdSectionMobile" style={{color: isWhite ? '#ffffff' : '#0A001A'}} className="navLinkMobile">ESTUDIO</a>
                <a href="#sixthSection" style={{color: isWhite ? '#ffffff' : '#0A001A'}} className="navLinkMobile">NOSOTROS</a>
                <a href="#eighthSection" style={{color: isWhite ? '#ffffff' : '#0A001A'}} className="navLinkMobile">CONTACTO</a>
            </div>
        </div>
    </>)
}
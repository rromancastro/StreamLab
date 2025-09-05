'use client';
import Image from "next/image"
import { useState } from "react";

export const NavBar = () => {

    //menu
    const [dropMenu, setDropMenu] = useState(false);

    const handleDropMenu = (e) => {
        e.preventDefault();
        setDropMenu(true);
    }

    //animacion logo
    const [positionTop1, setPositionTop1] = useState(0);
    const [positionTop2, setPositionTop2] = useState(38);

    const handClickLogo = () => {
        setPositionTop1(-38);
        setPositionTop2(0);
        setTimeout(() => {
            setPositionTop1(0);
            setPositionTop2(38);
        }, 1000);
    }

    return (
        <nav>
            <div id="navLogo" onClick={handClickLogo}>
                <Image src="/logo.png" alt="Logo" width={200} height={38} style={{top: positionTop1}} className="navLogoImage"/>
                <Image src="/logo.png" alt="Logo" width={200} height={38} style={{top: positionTop2}} className="navLogoImage"/>
            </div>

            <div id="navMenu">
                <button id="navMenuButton" onClick={handleDropMenu} style={{opacity: dropMenu ? 0 : 1, transition: '.3s'}}>MENÚ</button>
                <div id="navLinks" onMouseLeave={()=>setDropMenu(false)} style={{position: 'absolute', zIndex: 100, right: dropMenu ? 0 : -700, transition: 'opacity 0s, z-index 0s, right .5s'}}>
                    <a href="#" className="navLink">RESERVAS</a>
                    <a href="#" className="navLink">ESTUDIO</a>
                    <a href="#" className="navLink">NOSOTROS</a>
                    <a href="#" className="navLink">CONTACTO</a>
                </div>
            </div>
        </nav>
    )
}
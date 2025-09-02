'use client';
import Image from "next/image"
import { useState } from "react";

export const NavBar = () => {

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

            <div id="navLinks">
                <a href="#" className="navLink">RESERVAS</a>
                <a href="#" className="navLink">ESTUDIO</a>
                <a href="#" className="navLink">NOSOTROS</a>
                <a href="#" className="navLink">CONTACTO</a>
            </div>
        </nav>
    )
}
import Image from "next/image"

export const NavBar = () => {
    return (
        <nav>
            <div id="navLogo">
                <Image src="/logo.png" alt="Logo" width={200} height={38} className="navLogoImage" id="navLogoImage1"/>
                <Image src="/logo.png" alt="Logo" width={200} height={38} className="navLogoImage" id="navLogoImage2"/>
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
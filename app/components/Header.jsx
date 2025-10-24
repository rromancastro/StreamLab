import Image from "next/image"

export const Header = () => {
    return <section id="header">
        <Image src="/header/headerImage.png" priority alt="headerImage" width={848} height={885} id="headerImage"/>
        <Image src="/header/chicaSola.png" priority alt="chica sola" width={848} height={885} id="headerImage2"/>
    </section>
}
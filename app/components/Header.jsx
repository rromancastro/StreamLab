import Image from "next/image"

export const Header = () => {
    return <section id="header">
        <Image src="/header/gente.webp" priority alt="headerImage" width={848} height={885} id="headerImage"/>
    </section>
}
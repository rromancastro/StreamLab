import Image from "next/image"

export const Header = () => {
    return <section id="header">
        <div className="sliderContainer">
            <div className="sliderTrack">
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
            </div>
        </div>
        <Image src="/header/headerImage.png" alt="headerImage" width={848} height={885} id="headerImage"/>
        <Image src="/header/chicaSola.png" alt="chica sola" width={848} height={885} id="headerImage2"/>
    </section>
}
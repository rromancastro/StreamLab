"use client";
import { useEffect, useState } from "react";

export const SecondSection = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        console.log(scrollPercentage);
        
    }, [scrollPercentage]);
    
    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = (scrollTop / docHeight) * 100;
          setScrollPercentage(scrolled);
        };
    
        window.addEventListener("scroll", handleScroll);
        
        return () => window.removeEventListener("scroll", handleScroll).toFixed(1);
    }, []);

    return <section id="secondSection">
        <section id="secondSectionSticky">
            <p style={{opacity: scrollPercentage >= 33 ? 1 : 0 }}>¿CÓMO FUNCIONA?</p>
            <div className='animationTextUp'>
                <p style={{top: scrollPercentage >= 36 ? 2 : 74 }}>TURNOS DE <span>2 HS</span></p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: scrollPercentage >= 39 ? 2 : 74 }}>DE LUNES A</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: scrollPercentage >= 42 ? 2 : 74 }}>SABADOS</p>
            </div>
            <p style={{opacity: scrollPercentage >= 45 ? 1 : 0 }}>Elegí un día y un horario que este disponible. Reservá, venís, grabas y listo! Tambíen<br />podes elegir entre nuestros combos si sos un streamer regular. Y si queres te ayudamos<br />con la producción, edición, hosting y otras cositas.</p>
        </section>
    </section>
}
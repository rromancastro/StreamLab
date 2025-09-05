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

    //animacion 2 hs
    const [scaleH2, setScaleH2] = useState(0);
    const [animH2value, setAnimH2value] = useState(false);
    useEffect(()=>{
        if(scrollPercentage >= 37 && !animH2value) {
            setScaleH2(1.2)
            setAnimH2value(true)
            setTimeout(()=>{
                setScaleH2(1)
            }, [300])
        }
        if (scrollPercentage < 37) {
            setScaleH2(0)
            setAnimH2value(false)
        }
    },[scrollPercentage])


    return <section id="secondSection">
        <section id="secondSectionSticky">
            <p style={{opacity: scrollPercentage >= 33 ? 1 : 0 }}>¿CÓMO FUNCIONA?</p>
            <div className='animationTextUp'>
                <p style={{top: scrollPercentage >= 36 ? 12 : 84, right: 250}}>TURNOS DE </p>
                <span style={{transform: `scale(${scaleH2})`}}>2 HS</span>
            </div>
            <div className='animationTextUp'>
                <p style={{top: scrollPercentage >= 39 ? 12 : 84 }}>DE LUNES A</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: scrollPercentage >= 42 ? 12 : 84 }}>SABADOS</p>
            </div>
            <p style={{opacity: scrollPercentage >= 45 ? 1 : 0 }}>Elegí un día y un horario que este disponible. Reservá, venís, grabas y listo! Tambíen<br />podes elegir entre nuestros combos si sos un streamer regular. Y si queres te ayudamos<br />con la producción, edición, hosting y otras cositas.</p>
        </section>
    </section>
}
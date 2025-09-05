"use client";
import { useEffect, useState } from "react";
import { LuMapPin } from "react-icons/lu";

export const ThirdSection = () => {

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

    return <section id="thirdSection">
        <section id="thirdSectionSticky" style={{backgroundColor: scrollPercentage >= 62 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
            <div id="thirdSectionDiv1">
                <div className="animationTextHorizontal">
                    <p style={{left: scrollPercentage >= 66 ? 0 : '-450px'}}>EQUIPAMIENTO</p>
                </div>
                <div className="animationTextHorizontal">
                    <p style={{left: scrollPercentage >= 68 ? 0 : '-450px'}}>PROFESIONAL</p>
                </div>
                <div className="animationLineaHorizontal">
                    <div className="animationTextHorizontalLinea" style={{width: '403px', left: scrollPercentage >= 70 ? 0 : '-450px'}}></div>
                </div>
                <p className="thirdSectionP" style={{opacity: scrollPercentage >= 72 ? 1 : 0}}>Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla. Feugiat sed enim id vulputate libero. Enim aliquam suspendisse arcu vitae imperdiet netus nunc.</p>
            </div>
            <div id="thirdSectionDiv2">
                <div className="animationTextHorizontal">
                    <p style={{right: scrollPercentage >= 74 ? 0 : '-450px'}}>ASISTENCIA</p>
                </div>
                <div className="animationTextHorizontal">
                    <p style={{right: scrollPercentage >= 76 ? 0 : '-450px'}}>TECNICA</p>
                </div>
                <div className="animationTextHorizontal">
                    <p style={{right: scrollPercentage >= 78 ? 0 : '-450px'}}>INCLUIDA</p>
                </div>
                <div className="animationLineaHorizontal">
                    <div className="animationTextHorizontalLinea" style={{width: '265px', right: scrollPercentage >= 80 ? 0 : '-450px'}}></div>
                </div>
                <p style={{opacity: scrollPercentage >= 82 ? 1 : 0}} className="thirdSectionP">Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla</p>
            </div>
            <div id="thirdSectionDiv3">
                <div className="animationTextHorizontal">
                    <p style={{left: scrollPercentage >= 84 ? 0 : '-450px'}}>TURNOS</p>
                </div>
                <div className="animationTextHorizontal">
                    <p style={{left: scrollPercentage >= 86 ? 0 : '-450px'}}>FLEXIBLES</p>
                </div>
                <div className="animationTextHorizontal">
                    <p style={{left: scrollPercentage >= 88 ? 0 : '-450px'}}>DE 2 HORAS</p>
                </div>
                <div className="animationLineaHorizontal">
                    <div className="animationTextHorizontalLinea" style={{width: '345px', left: scrollPercentage >= 90 ? 0 : '-450px'}}></div>
                </div>
                <p style={{opacity: scrollPercentage >= 92 ? 1 : 0}} className="thirdSectionP">Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla</p>
            </div>
            <div id="thirdSectionDiv4">
                <div className="animationTextHorizontal">
                    <p style={{right: scrollPercentage >= 94 ? 0 : '-450px'}}>UBICACION</p>
                </div>
                <div className="animationTextHorizontal">
                    <p style={{right: scrollPercentage >= 96 ? 0 : '-450px'}}>ACCESIBLE</p>
                </div>
                <div className="animationLineaHorizontal">
                    <div className="animationTextHorizontalLinea" style={{width: '317px', right: scrollPercentage >= 98 ? 0 : '-450px'}}></div>
                </div>
                <p style={{opacity: scrollPercentage >= 100 ? 1 : 0}} className="thirdSectionP"><LuMapPin color="#ffffff"/> UBICACIÓN ACCESIBLE</p>
            </div>
            <p  style={{opacity: scrollPercentage >= 64 ? 1 : 0, transition: '.5s'}} id="thirdSectionTitle">¿QUE INCLUYEN?</p>
        </section>
    </section>
}
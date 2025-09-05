"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { LuMapPin } from "react-icons/lu";

export const ThirdSection = () => {

    const {scrollYProgress} = useScroll();
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(latest);
    });

    return <section id="thirdSection">
        <motion.section id="thirdSectionSticky" style={{backgroundColor: progress >= 0.18 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
            <div id="thirdSectionDiv1">
                <div className="animationTextHorizontal">
                    <motion.p style={{left: progress >= 0.185 ? 0 : '-450px'}}>EQUIPAMIENTO</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{left: progress >= 0.19 ? 0 : '-450px'}}>PROFESIONAL</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{width: '403px', left: progress >= 0.195 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p className="thirdSectionP" style={{opacity: progress >= 0.2 ? 1 : 0}}>Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla. Feugiat sed enim id vulputate libero. Enim aliquam suspendisse arcu vitae imperdiet netus nunc.</motion.p>
            </div>
            <div id="thirdSectionDiv2">
                <div className="animationTextHorizontal">
                    <motion.p style={{right: progress >= 0.205 ? 0 : '-450px'}}>ASISTENCIA</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{right: progress >= 0.21 ? 0 : '-450px'}}>TECNICA</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{right: progress >= 0.215 ? 0 : '-450px'}}>INCLUIDA</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{width: '265px', right: progress >= 0.22 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p style={{opacity: progress >= 0.225 ? 1 : 0}} className="thirdSectionP">Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla</motion.p>
            </div>
            <div id="thirdSectionDiv3">
                <div className="animationTextHorizontal">
                    <motion.p style={{left: progress >= 0.23 ? 0 : '-450px'}}>TURNOS</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{left: progress >= 0.235 ? 0 : '-450px'}}>FLEXIBLES</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{left: progress >= 0.24 ? 0 : '-450px'}}>DE 2 HORAS</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{width: '345px', left: progress >= 0.245 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p style={{opacity: progress >= 0.25 ? 1 : 0}} className="thirdSectionP">Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla</motion.p>
            </div>
            <div id="thirdSectionDiv4">
                <div className="animationTextHorizontal">
                    <motion.p style={{right: progress >= 0.255 ? 0 : '-450px'}}>UBICACION</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{right: progress >= 0.26 ? 0 : '-450px'}}>ACCESIBLE</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{width: '317px', right: progress >= 0.265 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p style={{opacity: progress >= 0.265 ? 1 : 0}} className="thirdSectionP"><LuMapPin color="#ffffff"/> UBICACIÓN ACCESIBLE</motion.p>
            </div>
            <motion.p  style={{opacity: progress >= 0.185 ? 1 : 0, transition: '.5s'}} id="thirdSectionTitle">¿QUE INCLUYEN?</motion.p>
        </motion.section>
    </section>
}
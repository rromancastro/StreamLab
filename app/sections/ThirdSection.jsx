"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { useInView } from "react-intersection-observer";

export const ThirdSection = () => {

    const {scrollYProgress} = useScroll();
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(latest);
    });

    const [animationStep, setAnimationStep] = useState(0);
    const { ref, inView } = useInView({
        threshold: 0.4,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    setAnimationStep(i + 1);
                }, 300 * i);
                }
            }
    }, [inView]);

    return  <motion.section ref={ref} id="thirdSection" style={{backgroundColor:  progress >= 0.28 && progress <= 0.39 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
            <div id="thirdSectionDiv1">
                <div className="animationTextHorizontal">
                    <motion.p style={{left: animationStep >= 2 ? 0 : '-450px'}}>EQUIPAMIENTO</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{left: animationStep >= 3 ? 0 : '-450px'}}>PROFESIONAL</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{opacity: progress >= 0.24 && progress >= 0.39 ? 0 : 1,width: '403px', left: animationStep >= 4 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p className="thirdSectionP" style={{opacity: animationStep >= 5 ? 1 : 0}}>Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla. Feugiat sed enim id vulputate libero. Enim aliquam suspendisse arcu vitae imperdiet netus nunc.</motion.p>
            </div>
            <div id="thirdSectionDiv2">
                <div className="animationTextHorizontal">
                    <motion.p style={{right: animationStep >= 6 ? 0 : '-450px'}}>ASISTENCIA</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{right: animationStep >= 7 ? 0 : '-450px'}}>TECNICA</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{right: animationStep >= 8 ? 0 : '-450px'}}>INCLUIDA</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{opacity: progress >= 0.24 && progress >= 0.39 ? 0 : 1,width: '265px', right: animationStep >= 9 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p style={{opacity: animationStep >= 10 ? 1 : 0, textAlign: 'end'}} className="thirdSectionP">El alquiler de la sala incluye un operador técnico para asistirte durante toda tu sesión para que vos no tengas que preocuparte por la transmisión, la imagen o el sonido. ¡Recomendamos enviar todo de antemano para que esté listo al momento de tu stream!</motion.p>
            </div>
            <div id="thirdSectionDiv3">
                <div className="animationTextHorizontal">
                    <motion.p style={{left: animationStep >= 11 ? 0 : '-450px'}}>TURNOS</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{left: animationStep >= 12 ? 0 : '-450px'}}>DE 2 HORAS</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{opacity: progress >= 0.24 && progress >= 0.39 ? 0 : 1,width: '345px', left: animationStep >= 13 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p style={{opacity: animationStep >= 14 ? 1 : 0}} className="thirdSectionP">Elegí el día que quieras, reservá y durante dos horas vas a poder dedicarte 100% a tu contenido. 
</motion.p>
            </div>
            <div id="thirdSectionDiv4">
                <div className="animationTextHorizontal">
                    <motion.p style={{right: animationStep >= 15 ? 0 : '-450px'}}>UBICACION</motion.p>
                </div>
                <div className="animationTextHorizontal">
                    <motion.p style={{right: animationStep >= 16 ? 0 : '-450px'}}>ACCESIBLE</motion.p>
                </div>
                <div className="animationLineaHorizontal">
                    <motion.div className="animationTextHorizontalLinea" style={{opacity: progress >= 0.24 && progress >= 0.39 ? 0 : 1,width: '403px', width: '317px', right: animationStep >= 17 ? 0 : '-450px'}}></motion.div>
                </div>
                <motion.p style={{opacity: animationStep >= 18 ? 1 : 0, textAlign: 'end'}} className="thirdSectionP"><LuMapPin color="#ffffff"/> Estamos en Arévalo 1462, Palermo Hollywood. <br /> <a style={{color: '#fff'}} target="_blank" href="https://maps.app.goo.gl/peYEpgTiqd64aP276">Fijate como llegar acá!</a></motion.p>
            </div>
            <motion.p  style={{opacity: animationStep >= 1 ? 1 : 0, transition: '.5s'}} id="thirdSectionTitle">¿QUE INCLUYEN?</motion.p>
        </motion.section>
}
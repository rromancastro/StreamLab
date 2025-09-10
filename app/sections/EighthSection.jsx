"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { LuMapPin } from "react-icons/lu";
import { RxCopy } from "react-icons/rx";

export const EighthSection = () => {

    const {scrollYProgress} = useScroll();

    //textos
    const opacityText1 = useTransform(scrollYProgress, [0.7, 0.72], [0, 1]);
    const yText1 = useTransform(scrollYProgress, [0.72, 0.74], [95, 12]);
    const yText2 = useTransform(scrollYProgress, [0.74, 0.76], [95, 12]);
    const yText3 = useTransform(scrollYProgress, [0.76, 0.78], [95, 12]);
    const yText4 = useTransform(scrollYProgress, [0.78, 0.80], [95, 12]);
    const opacityRedes = useTransform(scrollYProgress, [0.80, 0.82], [0, 1]);
    const yText5 = useTransform(scrollYProgress, [0.82, 0.84], [95, 12]);
    const yText6 = useTransform(scrollYProgress, [0.84, 0.86], [95, 12]);
    const yText7 = useTransform(scrollYProgress, [0.86, 0.88], [95, 12]);
    const opacityText2 = useTransform(scrollYProgress, [0.88, 0.9], [0, 1]);

    // estados
    const [useWhatsapp, setUseWhatsapp] = useState(false);
    const [useMail, setUseMail] = useState(false);
    const [useRedes, setUseRedes] = useState(false);

    // refs para los timeouts
    const whatsappTimeout = useRef(null);
    const mailTimeout = useRef(null);
    const redesTimeout = useRef(null);

    // handlers genericos
    const handleEnter = (ref) => {
        if (ref.current) clearTimeout(ref.current);
    };

    const handleLeave = (ref, setState) => {
        ref.current = setTimeout(() => {
            setState(false);
        }, 2000);
    };

    return (
        <section id="eighthSection">
            <section id="eighthSectionSticky">
                <motion.p id="eigthSectionTitle" style={{opacity: opacityText1}}>
                    ¿DUDAS, CONSULTAS O SUGERENCIAS?
                </motion.p>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText1}}>PODES</motion.p>
                </div>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText2}}>CONTACTARNOS</motion.p>
                </div>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText3}}>A TRAVES DE</motion.p>
                </div>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText4}}>ESTOS MEDIOS</motion.p>
                </div>

                <motion.div style={{opacity: opacityRedes}} id="eighthSectionRedesContainer">
                    <div className="eighthSectionRed" onMouseEnter={() => handleEnter(whatsappTimeout)} onMouseLeave={() => handleLeave(whatsappTimeout, setUseWhatsapp)}>
                        <p style={{top: useWhatsapp ? '-24px' : 0}} onClick={() => setUseWhatsapp(true)}>WHATSAPP</p>
                        <p style={{top: useWhatsapp ? 0 : '24px'}}>11 6544879 <RxCopy onClick={() => navigator.clipboard.writeText("11 6544879")} width={24} height={24} className="copyIcon"/></p>
                    </div>
                    <div className="eighthSectionRed" onMouseEnter={() => handleEnter(mailTimeout)} onMouseLeave={() => handleLeave(mailTimeout, setUseMail)}>
                        <p style={{top: useMail ? '-24px' : 0}} onClick={() => setUseMail(true)}>MAIL</p>
                        <p style={{top: useMail ? 0 : '24px'}}>info@streamlab.com<RxCopy onClick={() => navigator.clipboard.writeText("info@streamlab.com")} width={24} height={24} className="copyIcon"/></p>
                    </div>
                    <div className="eighthSectionRed" onMouseEnter={() => handleEnter(redesTimeout)} onMouseLeave={() => handleLeave(redesTimeout, setUseRedes)}>
                        <p style={{top: useRedes ? '-24px' : 0}} onClick={() => setUseRedes(true)}>REDES</p>
                        <p style={{top: useRedes ? 0 : '24px'}}>
                            <a href="#">X</a>
                            <a href="#">IG</a>
                            <a href="#">LI</a>
                        </p>
                    </div>
                </motion.div>

                <div className='animationTextUp'>
                    <motion.p style={{top: yText5}}>O</motion.p>
                </div>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText6}}>ENCONTRANOS</motion.p>
                </div>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText7}}>EN</motion.p>
                </div>

                <motion.p id="eigthSectionUbi" style={{opacity: opacityText2}}>
                    <LuMapPin color="#9D4EDD"/> UBICACIÓN ACCESIBLE
                </motion.p>
            </section>
        </section>
    )
}

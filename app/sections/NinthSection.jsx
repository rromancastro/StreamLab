"use client";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

export const NinthSection = () => {
    const { scrollYProgress } = useScroll();

    const imageBrightness = useTransform(scrollYProgress, [0.93, 0.94], [0.3, 1]);
    const imageFilter = useMotionTemplate`brightness(${imageBrightness})`;
    const imageWidth = useTransform(scrollYProgress, [0.97, 0.98], ["100%", "80%"]);
    const imageHeight = useTransform(scrollYProgress, [0.97, 0.98], ["100svh", "65svh"]);
    const imageY = useTransform(scrollYProgress, [0.97, 0.98], ["0svh", "11svh"]);
    const imageRadius = useTransform(scrollYProgress, [0.97, 0.98], ["0px", "360px"]);

    const yText1 = useTransform(scrollYProgress, [0.94, 0.95], [95, 12]);
    const yText2 = useTransform(scrollYProgress, [0.95, 0.96], [95, 12]);
    const yText3 = useTransform(scrollYProgress, [0.96, 0.97], [95, 12]);

    const redesOpacity = useTransform(scrollYProgress, [0.98, 0.99], [0, 1]);
    const copyrightOpacity = useTransform(scrollYProgress, [0.99, 1], [0, 1]);


    return <section id="ninthSection">
        <section id="ninthSectionSticky">
            <motion.img style={{filter: imageFilter, width: imageWidth, height: imageHeight, y: imageY, borderRadius: imageRadius}} src={"/ninthSection/banner.png"} alt="Imagen banner" id="ninthSectionBanner"/>
            <div id="ninthSectionTextContainer">
                <div className='animationTextUp'>
                    <motion.p style={{top: yText1}}>CONTEMOS</motion.p>
                </div>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText2}}>TU HISTORIA</motion.p>
                </div>
                <div className='animationTextUp'>
                    <motion.p style={{top: yText3}}>JUNTOS</motion.p>
                </div>
            </div>
            <motion.div style={{opacity: redesOpacity}} id="ninthSectionRedesContainer">
                <a href="#">X.COM</a>
                <a href="#">INSTAGRAM</a>
                <a href="#">LINKEDIN</a>
                <a href="#">YOUTUBE</a>
            </motion.div>
            <motion.p style={{opacity: copyrightOpacity}} id="ninthSectionCopyright">
                Stream Lab © Término Y Condiciones / Políticas De Reserva<br />
                Diseño: <span>Francisco Castgnola</span><br />
                Devs: <span>Roman Castro y Rafael Defelice</span>
            </motion.p>
        </section>
    </section>
}
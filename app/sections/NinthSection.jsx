"use client";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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

    //responsive
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 863);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [animationStep, setAnimationStep] = useState(0);
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            setTimeout(() => {
                setAnimationStep(1);
            }, 500);
            setTimeout(() => {
                setAnimationStep(2);
            }, 1000);
            setTimeout(() => {
                setAnimationStep(3);
            },  1500);
            setTimeout(() => {
                setAnimationStep(4);
            }, 2000);
            setTimeout(() => {
                setAnimationStep(5);
            }, 2500);
            setTimeout(() => {
                setAnimationStep(6);
            }, 3000);
            setTimeout(() => {
                setAnimationStep(7);
            }, 3500);
            setTimeout(() => {
                setAnimationStep(8);
            }, 4000);
            setTimeout(() => {
                setAnimationStep(9);
            }, 4500);
            setTimeout(() => {
                setAnimationStep(10);
            },  5000);
        }
    }, [inView]);


    return <section id="ninthSection">
        {!isMobile ? <section id="ninthSectionSticky">
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
        :
        <section ref={ref} id="ninthSectionSticky">
            <img style={{filter: animationStep >= 1 ? 'brightness(1)' : 'brightness(0.3)', width: animationStep >= 2 ? '95%' : '100%', height: animationStep >= 2 ? '80svh' : '100vh', top: animationStep >= 2 ? '3svh' : 0, borderRadius: animationStep >= 2 ? 360 : 0}} src={"/ninthSection/banner.png"} alt="Imagen banner" id="ninthSectionBanner"/>
            <div id="ninthSectionTextContainer">
                <div className='animationTextUp'>
                    <p style={{top: animationStep >= 3 ? 12 : 50}}>CONTEMOS</p>
                </div>
                <div className='animationTextUp'>
                    <p style={{top: animationStep >= 4 ? 12 : 50}}>TU HISTORIA</p>
                </div>
                <div className='animationTextUp'>
                    <p style={{top: animationStep >= 5 ? 12 : 50}}>JUNTOS</p>
                </div>
            </div>
            <div style={{opacity: animationStep >= 6 ? 1 : 0}} id="ninthSectionRedesContainer">
                <a href="#">X.COM</a>
                <a href="#">INSTAGRAM</a>
                <a href="#">LINKEDIN</a>
                <a href="#">YOUTUBE</a>
            </div>
            <p style={{opacity: animationStep >= 7 ? 1 : 0}} id="ninthSectionCopyright">
                Stream Lab © Término Y Condiciones / Políticas De Reserva<br />
                Diseño: <span>Francisco Castgnola</span><br />
                Devs: <span>Roman Castro y Rafael Defelice</span>
            </p>
        </section>
        }
    </section>
}
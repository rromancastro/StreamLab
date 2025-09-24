"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const SixthSection = () => {
    const { scrollYProgress } = useScroll();

    //textos
    const opacityText1 = useTransform(scrollYProgress, [0.48, 0.495], [0, 1]);
    const yText1 = useTransform(scrollYProgress, [0.495, 0.51], [95, 12]);
    const yText2 = useTransform(scrollYProgress, [0.51, 0.525], [95, 12]);
    const yText3 = useTransform(scrollYProgress, [0.525, 0.54], [95, 12]);
    const yText4 = useTransform(scrollYProgress, [0.54, 0.555], [95, 12]);
    const yText5 = useTransform(scrollYProgress, [0.555, 0.57], [95, 12]);
    const opacityFinal = useTransform(scrollYProgress, [0.595, 0.6], [0, 1]);

    //imagenes
    const xImagen1 = useTransform(scrollYProgress, [0.57, 0.585], [0, -125]);
    const yImagen1 = useTransform(scrollYProgress, [0.57, 0.585], [800, 380]);

    const xImagen2 = useTransform(scrollYProgress, [0.57, 0.585], [0, 175]);
    const yImagen2 = useTransform(scrollYProgress, [0.57, 0.585], [800, 380]);

    //linea violeta
    const xLineaVioleta = useTransform(scrollYProgress, [0.585, 0.59], [-1500, 0]);

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
        }
    }, [inView]);

    return <section id="sixthSection">
        {!isMobile ? <section id="sixthSectionSticky">
            <motion.p id="sixthSectionTitle" style={{opacity: opacityText1}}>¿QUIENES SOMOS?</motion.p>
            <div className='animationTextUp'>
                <motion.p style={{top: yText1}}>CREATIVOS</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText2}}>PRODUCTORES</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText3}}>LOCUTORES</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText4}}>STREAMERS</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText5}}>CURIOSOS</motion.p>
            </div>

            <motion.img className="sixtSectionImg" src={"/sixthSection/img2.png"} alt="Imagen 1" style={{x: xImagen2, y: yImagen2}} />
            <motion.img className="sixtSectionImg" src={"/sixthSection/img1.png"} alt="Imagen 1" style={{x: xImagen1, y: yImagen1}} />
        
            <motion.div id="sixthSectionLineaVioleta" style={{x: xLineaVioleta}}></motion.div>

            <motion.p id="sixthSectionFinalText" style={{opacity: opacityFinal}}>Lorem ipsum dolor sit amet consectetur. Donec elementum sem pharetra elit odio nunc luctus dolor. Turpis hendrerit ultrices sagittis integer metus nibh nisl in. Felis sed sit proin faucibus a pellentesque ac eu cras. Facilisis et ullamcorper aliquam enim convallis non lacus convallis. Odio varius nibh volutpat tincidunt egestas aliquam pellentesque amet. Ligula enim dictum vitae sit interdum tincidunt duis enim lectus. Purus mauris et vitae mi massa vitae. Id rhoncus enim quam sed interdum senectus morbi massa. Enim quis mi sed egestas in quam arcu.</motion.p>
        </section>
        :
        <section ref={ref} id="sixthSectionSticky">
            <p id="sixthSectionTitle" style={{opacity: animationStep >= 1 ? 1 : 0 }}>¿QUIENES SOMOS?</p>
            <div className='animationTextUp'>
                <p style={{top: animationStep >= 2 ? 12 : 50 }}>CREATIVOS</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: animationStep >= 3 ? 12 : 50 }}>PRODUCTORES</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: animationStep >= 4 ? 12 : 50 }}>LOCUTORES</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: animationStep >= 5 ? 12 : 50 }}>STREAMERS</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: animationStep >= 6 ? 12 : 50 }}>CURIOSOS</p>
            </div>

            <img className="sixtSectionImg" src={"/sixthSection/img2.png"} alt="Imagen 1" style={{right: animationStep >= 7 ? "0%" : '0' , top: animationStep >= 7 ? '30.5vh' : '100vh', opacity: animationStep >= 7 ? 1 : 0}} />
            <img className="sixtSectionImg" src={"/sixthSection/img1.png"} alt="Imagen 1" style={{left: animationStep >= 7 ? "10%": '0' , top: animationStep >= 7 ? '30.5vh' : '100vh', opacity: animationStep >= 7 ? 1 : 0}} />
        
            <div id="sixthSectionLineaVioleta" style={{left: animationStep >= 8 ? 0 : '-100%' }}></div>

            <p id="sixthSectionFinalText" style={{opacity: animationStep >= 9 ? 1 : 0 }}>Lorem ipsum dolor sit amet consectetur. Donec elementum sem pharetra elit odio nunc luctus dolor. Turpis hendrerit ultrices sagittis integer metus nibh nisl in. Felis sed sit proin faucibus a pellentesque ac eu cras. Facilisis et ullamcorper aliquam enim convallis non lacus convallis. Odio varius nibh volutpat tincidunt egestas aliquam pellentesque amet. Ligula enim dictum vitae sit interdum tincidunt duis enim lectus. Purus mauris et vitae mi massa vitae. Id rhoncus enim quam sed interdum senectus morbi massa. Enim quis mi sed egestas in quam arcu.</p>
        </section>
        }
    </section>
}
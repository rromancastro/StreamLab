"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TextUpComponent } from "../components";

export const SixthSection = () => {
    const { scrollYProgress } = useScroll();

   

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
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    setAnimationStep(i + 1);
                }, 500 * i);
                }
            }
    }, [inView]);
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
    return <section ref={ref} id="sixthSection">
            <p id="sixthSectionTitle" style={{opacity: animationStep >= 1 ? 1 : 0 }}>¿QUIENES SOMOS?</p>
            <TextUpComponent fontSize={isMobile ? 30 : 72} active={animationStep >= 2} textContent={"CREATIVOS"} />
            <TextUpComponent fontSize={isMobile ? 30 : 72} active={animationStep >= 3} textContent={"PRODUCTORES"} />
            <TextUpComponent fontSize={isMobile ? 30 : 72} active={animationStep >= 4} textContent={"LOCUTORES"} />
            <TextUpComponent fontSize={isMobile ? 30 : 72} active={animationStep >= 5} textContent={"STREAMERS"} />
            <TextUpComponent fontSize={isMobile ? 30 : 72} active={animationStep >= 6} textContent={"CURIOSOS"} />

            <img className="sixtSectionImg" src={"/sixthSection/img2.png"} alt="Imagen 1" style={{right: isMobile ? animationStep >= 7 ? "0%" : '0' : animationStep >= 7 ? "25%" : '30%', top: isMobile ? animationStep >= 7 ? '280px' : '100vh' : animationStep >= 7 ? '440px' : '100vh', opacity: animationStep >= 7 ? 1 : 0}} />
            <img className="sixtSectionImg" src={"/sixthSection/img1.png"} alt="Imagen 1" style={{left: isMobile ? animationStep >= 7 ? "5%": '0' : animationStep >= 7 ? "25%" : '30%', top: isMobile ? animationStep >= 7 ? '280px' : '100vh' : animationStep >= 7 ? '440px' : '100vh', opacity: animationStep >= 7 ? 1 : 0}} />
        
            <div id="sixthSectionLineaVioleta" style={{left: animationStep >= 8 ? 0 : '-100%' }}></div>

            <p id="sixthSectionFinalText" style={{opacity: animationStep >= 9 ? 1 : 0 }}>Lorem ipsum dolor sit amet consectetur. Donec elementum sem pharetra elit odio nunc luctus dolor. Turpis hendrerit ultrices sagittis integer metus nibh nisl in. Felis sed sit proin faucibus a pellentesque ac eu cras. Facilisis et ullamcorper aliquam enim convallis non lacus convallis. Odio varius nibh volutpat tincidunt egestas aliquam pellentesque amet. Ligula enim dictum vitae sit interdum tincidunt duis enim lectus. Purus mauris et vitae mi massa vitae. Id rhoncus enim quam sed interdum senectus morbi massa. Enim quis mi sed egestas in quam arcu.</p>
        </section>
}
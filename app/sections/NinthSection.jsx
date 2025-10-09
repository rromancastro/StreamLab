"use client";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TextUpComponent } from "../components";

export const NinthSection = () => {
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
        threshold: 0.8,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            for (let i = 0; i < 11; i++) {
                setTimeout(() => {
                    setAnimationStep(i + 1);
                }, 500 * i);
                }
            }
    }, [inView]);


    return <section ref={ref} id="ninthSection">
            <img style={{filter: animationStep >= 1 ? 'brightness(1)' : 'brightness(0.3)', width: isMobile ? animationStep >= 2 ? '95%' : '100%' : animationStep >= 2 ? '80%' : '100%', height:  isMobile ? animationStep >= 2 ? '720px' : '900px' : animationStep >= 2 ? '65vh' : '100vh', top: isMobile ? animationStep >= 2 ? '3svh' : 0 : animationStep >= 2 ? '11svh' : 0, borderRadius: animationStep >= 2 ? 360 : 0}} src={"/ninthSection/banner.png"} alt="Imagen banner" id="ninthSectionBanner"/>
            <div id="ninthSectionTextContainer">
                <TextUpComponent color="#fff" fontSize={isMobile ? 30 : 72} active={animationStep >= 3} textContent={"CONTEMOS"} />
                <TextUpComponent color="#fff" fontSize={isMobile ? 30 : 72} active={animationStep >= 4} textContent={"TU HISTORIA"} />
                <TextUpComponent color="#fff" fontSize={isMobile ? 30 : 72} active={animationStep >= 5} textContent={"JUNTOS"} />
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
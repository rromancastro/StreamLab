"use client";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { S4Card1, S4Card2, S4Card3 } from "../components";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const FourthSection = () => {

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
        }
    }, [inView]);


    //scroll

    const { scrollYProgress } = useScroll();
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(latest);
    });

    const yText1 = useTransform(scrollYProgress, [0.34, 0.355], [95, 12]);
    const yText2 = useTransform(scrollYProgress, [0.355, 0.37], [95, 12]);
    const yText3 = useTransform(scrollYProgress, [0.37, 0.3855], [95, 12]);
    const yText4 = useTransform(scrollYProgress, [0.3855, 0.40], [95, 12]);

    //animaciones cards
    const xCard1 = useTransform(scrollYProgress, [0.40, 0.41], [0, -230]);
    const yCard1 = useTransform(scrollYProgress, [0.40, 0.41], [1000, 380]);
    const rotateCard1 = useTransform(scrollYProgress, [0.40, 0.41], [0, -11]);
    const opacityCard1 = useTransform(scrollYProgress, [0.40, 0.41], [0, 1]);

    const xCard2 = useTransform(scrollYProgress, [0.40, 0.41], [0, 0]);
    const yCard2 = useTransform(scrollYProgress, [0.40, 0.41], [1000, 355]);
    const opacityCard2 = useTransform(scrollYProgress, [0.40, 0.41], [0, 1]);

    const xCard3 = useTransform(scrollYProgress, [0.40, 0.41], [0, 230]);
    const yCard3 = useTransform(scrollYProgress, [0.40, 0.41], [1000, 380]);
    const rotateCard3 = useTransform(scrollYProgress, [0.40, 0.41], [0, 11]);
    const opacityCard3 = useTransform(scrollYProgress, [0.40, 0.41], [0, 1]);

    return <section id="fourthSection">
        {!isMobile ? <motion.section id="fourthSectionSticky" style={{backgroundColor: progress >= 0.188 && progress <= 0.34 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
            <div className='animationTextUp'>
                <motion.p style={{top: yText1}}>RESERVA</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText2}}>TU TURNO</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText3}}>TU COMBO, O</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText4}}>LO QUE QUIERAS.</motion.p>
            </div>
            <S4Card3 y={yCard3} x={xCard3} opacity={opacityCard3} rotate={rotateCard3}/>
            <S4Card2 y={yCard2} x={xCard2} opacity={opacityCard2} />
            <S4Card1 y={yCard1} x={xCard1} opacity={opacityCard1} rotate={rotateCard1}/>
        </motion.section>
        :
        <section ref={ref} id="fourthSectionSticky" style={{backgroundColor: isMobile ? progress >= 0.21 && progress <= 0.44 ? '#7B2CBF' : '#ffffff' : progress >= 0.188 && progress <= 0.34 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
            <div className='animationTextUp'>
                <p style={{top: animationStep >=1 ? 12 : 52}}>RESERVA</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: animationStep >=2 ? 12 : 52}}>TU TURNO</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: animationStep >=3 ? 12 : 52}}>TU COMBO, O LO</p>
            </div>
            <div className='animationTextUp'>
                <p style={{top: animationStep >=4 ? 12 : 52}}>QUE QUIERAS.</p>
            </div>
            <div style={{display: 'flex', width: '100%', height: '440px', justifyContent: 'flex-start',overflowX: 'scroll', alignItems: 'center', scrollbarWidth: 'none', msOverflowStyle: 'none', gap: '20px', padding: '20px'}}>
                <S4Card1 y={0} x={0} opacity={animationStep >= 5 ? 1 : 0} rotate={0}/>
                <S4Card2 y={0} x={animationStep >= 6 ? 0 : -260} opacity={animationStep >= 5 ? 1 : 0} />
                <S4Card3 y={0} x={animationStep >= 6 ? 0 : -520} opacity={animationStep >= 5 ? 1 : 0} rotate={0}/>
            </div>
        </section>
    }
    </section>
}
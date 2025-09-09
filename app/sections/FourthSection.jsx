"use client";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { S4Card1, S4Card2, S4Card3 } from "../components";
import { useState } from "react";

export const FourthSection = () => {
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
        <motion.section id="fourthSectionSticky" style={{backgroundColor: progress >= 0.188 && progress <= 0.34 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
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
    </section>
}
"use client";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { TextUpComponent } from "../components";

export const SecondSection = () => {
    const { scrollYProgress } = useScroll();
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(latest);
    });

    useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      console.log("Progreso global:", latest.toFixed(2)); // imprime 0.00 a 1.00
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

    const opacityText1 = useTransform(scrollYProgress, [0.09, 0.102], [0, 1]);
    const yText1 = useTransform(scrollYProgress, [0.102, 0.114], [95, 12]);
    const scaleH2 = useTransform(scrollYProgress, [0.114, 0.119, 0.126], [0, 1.2, 1]);
    const yText2 = useTransform(scrollYProgress, [0.126, 0.138], [95, 12]);
    const yText3 = useTransform(scrollYProgress, [0.138, 0.15], [95, 12]);
    const opacityFinal = useTransform(scrollYProgress, [0.152, 0.16], [0, 1]);

    // const [scaleH2, setScaleH2] = useState(1);


    return <section id="secondSection">
        <motion.section id="secondSectionSticky" style={{backgroundColor: progress >= 0.188 && progress <= 0.32 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
            <motion.p style={{ opacity: opacityText1 }}>¿CÓMO FUNCIONA?</motion.p>
            <div className='animationTextUp'>
                <motion.p style={{top: yText1, right: 250}}>TURNOS DE </motion.p>
                <motion.span style={{scale: scaleH2}}>2 HS</motion.span>
            </div>
            <TextUpComponent top={yText2} textContent={"DE LUNES A"} />
            <TextUpComponent top={yText3} textContent={"SABADOS"} />
            <motion.p style={{opacity: opacityFinal}}>Elegí un día y un horario que este disponible. Reservá, venís, grabas y listo! Tambíen<br />podes elegir entre nuestros combos si sos un streamer regular. Y si queres te ayudamos<br />con la producción, edición, hosting y otras cositas.</motion.p>
        </motion.section>
    </section>
}
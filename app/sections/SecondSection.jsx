"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const SecondSection = () => {
    const { scrollYProgress } = useScroll();

    useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      console.log("Progreso global:", latest.toFixed(2)); // imprime 0.00 a 1.00
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

    const opacityText1 = useTransform(scrollYProgress, [0.08, 0.09], [0, 1]);
    const yText1 = useTransform(scrollYProgress, [0.09, 0.1], [95, 12]);
    const scaleH2 = useTransform(scrollYProgress, [0.1, 0.105, 0.11], [0, 1.2, 1]);
    const yText2 = useTransform(scrollYProgress, [0.11, 0.12], [95, 12]);
    const yText3 = useTransform(scrollYProgress, [0.12, 0.13], [95, 12]);
    const opacityFinal = useTransform(scrollYProgress, [0.13, 0.14], [0, 1]);

    // const [scaleH2, setScaleH2] = useState(1);


    return <section id="secondSection">
        <section id="secondSectionSticky">
            <motion.p style={{ opacity: opacityText1 }}>¿CÓMO FUNCIONA?</motion.p>
            <div className='animationTextUp'>
                <motion.p style={{top: yText1, right: 250}}>TURNOS DE </motion.p>
                <motion.span style={{scale: scaleH2}}>2 HS</motion.span>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText2}}>DE LUNES A</motion.p>
            </div>
            <div className='animationTextUp'>
                <motion.p style={{top: yText3}}>SABADOS</motion.p>
            </div>
            <motion.p style={{opacity: opacityFinal}}>Elegí un día y un horario que este disponible. Reservá, venís, grabas y listo! Tambíen<br />podes elegir entre nuestros combos si sos un streamer regular. Y si queres te ayudamos<br />con la producción, edición, hosting y otras cositas.</motion.p>
        </section>
    </section>
}
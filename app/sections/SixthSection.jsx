"use client";
import { motion, useScroll, useTransform } from "framer-motion";

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


    return <section id="sixthSection">
        <section id="sixthSectionSticky">
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
    </section>
}
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header, Turnera } from "../components"

export const FirstSection = () => {
    const { scrollYProgress } = useScroll();
    const top = useTransform(scrollYProgress, [0, 0.05], [580, 1280]);
    return <section id="firstSection">
        <Header />
        <motion.div style={{top: top}} className="sliderContainer">
            <div className="sliderTrack">
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
            </div>
        </motion.div>
        <Turnera />
    </section>
}
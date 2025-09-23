"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header, Turnera } from "../components"
import { useEffect, useState } from "react";

export const FirstSection = () => {

    //responsive
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 863);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll();
    const top = useTransform(scrollYProgress, [0, 0.05], [580, 1280]);
    return <section id="firstSection">
        <Header />
        {!isMobile ? <motion.div style={{top: top}} className="sliderContainer">
            <div className="sliderTrack">
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
            </div>
        </motion.div> : <div style={{top: '430px'}} className="sliderContainer">
            <div className="sliderTrack">
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
            </div>
        </div>
        }
        <Turnera />
    </section>
}
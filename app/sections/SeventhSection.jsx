"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const SeventhSection = () => {

    const {scrollYProgress} = useScroll();

    const rotacion1 = useTransform(scrollYProgress, [0.63, 0.66], [12, 0]);
    const rotacion2 = useTransform(scrollYProgress, [0.63, 0.66], [12, 0]);

    const rotacion1Mobile = useTransform(scrollYProgress, [0.70, 0.75], [12, 0]);
    const rotacion2Mobile = useTransform(scrollYProgress, [0.70, 0.75], [12, 0]);
        //responsive
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 863);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <section id="seventhSection">
        <section id="seventhSectionSticky">
        <motion.div style={{rotate: isMobile ? rotacion1Mobile : rotacion1}} className="sliderContainer2">
            <div className="sliderTrack2">
                <span className="sliderText2">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText2">EXPERIMENTA EL STREAMING</span>
            </div>
        </motion.div>
        <motion.div style={{rotate: isMobile ? rotacion2Mobile : rotacion2}} className="sliderContainer3">
            <div className="sliderTrack3">
                <span className="sliderText3">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText3">EXPERIMENTA EL STREAMING</span>
            </div>
        </motion.div>
        </section>
    </section>
}
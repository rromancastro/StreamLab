"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export const SeventhSection = () => {

    const {scrollYProgress} = useScroll();

    const rotacion1 = useTransform(scrollYProgress, [0.96, 1], [12, 0]);
    const rotacion2 = useTransform(scrollYProgress, [0.96, 1], [12, 0]);

    return <section id="seventhSection">
        <section id="seventhSectionSticky">
        <motion.div style={{rotate: rotacion1}} className="sliderContainer2">
            <div className="sliderTrack2">
                <span className="sliderText2">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText2">EXPERIMENTA EL STREAMING</span>
            </div>
        </motion.div>
        <motion.div style={{rotate: rotacion2}} className="sliderContainer3">
            <div className="sliderTrack3">
                <span className="sliderText3">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText3">EXPERIMENTA EL STREAMING</span>
            </div>
        </motion.div>
        </section>
    </section>
}
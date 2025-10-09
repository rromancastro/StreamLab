"use client";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Header, TurneraMensual, TurneraSimple } from "../components"
import { useEffect, useState } from "react";

export const FirstSection = () => {

    const {scrollYProgress} = useScroll();
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(latest);
    });

    //responsive
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 863);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [turnera, setTurnera] = useState('simple');

    return <section  style={{backgroundColor:  isMobile ? progress >= 0.15 && progress <= 0.33 ? '#7B2CBF' : '#ffffff' : progress >= 0.28 && progress <= 0.39 ? '#7B2CBF' : '#ffffff', transition: '.5s'}} id="firstSection">
        <Header />
        {!isMobile ? <div className="sliderContainer">
            <div className="sliderTrack">
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
            </div>
        </div> : <div className="sliderContainer">
            <div className="sliderTrack">
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
                <span className="sliderText">EXPERIMENTA EL STREAMING</span>
            </div>
        </div>
        }
        {
            turnera === 'simple' ? <TurneraSimple setTurnera={setTurnera} /> : <TurneraMensual setTurnera={setTurnera} />
        }
    </section>
}
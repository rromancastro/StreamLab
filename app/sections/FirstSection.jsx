"use client";
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

    return <section id="firstSection">
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
        <Turnera />
    </section>
}
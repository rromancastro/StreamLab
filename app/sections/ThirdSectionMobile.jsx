"use client";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { LuMapPin } from "react-icons/lu";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

export const ThirdSectionMobile = () => {

    const {scrollYProgress} = useScroll();
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(latest);
    });

    const { ref: ref1, inView: inView1 } = useInView({
        threshold: 1,
        triggerOnce: true,
    });
    const { ref: ref2, inView: inView2 } = useInView({
        threshold: 1,
        triggerOnce: true,
    });
    const { ref: ref3, inView: inView3 } = useInView({
        threshold: 1,
        triggerOnce: true,
    });

    const { ref: ref4, inView: inView4 } = useInView({
        threshold: 1,
        triggerOnce: true,
    });


    return <section id="thirdSectionMobile"  style={{backgroundColor: progress >= 0.21 && progress <= 0.44 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
        <h2 id="thirdSectionMobileTitle">¿QUE INCLUYEN?</h2>

        <article style={{opacity: inView1 ? 1 : 0, transition: '.5s', transform: inView1 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref1} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">EQUIPAMIENTO</p>
            <p className="thirdSectionMobileSubtitle">PROFESIONAL</p>
            <div style={{opacity: progress >= 0.21 && progress <= 0.44 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileP">Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla. Feugiat sed enim id vulputate libero. Enim aliquam suspendisse arcu vitae imperdiet netus nunc.</p>
        </article>

        <article style={{opacity: inView2 ? 1 : 0, transition: '.5s', transform: inView2 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref2} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">TURNOS</p>
            <p className="thirdSectionMobileSubtitle">FLEXIBLES</p>
            <p className="thirdSectionMobileSubtitle">DE 2 HORAS</p>
            <div style={{opacity: progress >= 0.21 && progress <= 0.44 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileP">Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla. Feugiat sed enim id vulputate libero. Enim aliquam suspendisse arcu vitae imperdiet netus nunc.</p>
        </article>

        <article style={{opacity: inView3 ? 1 : 0, transition: '.5s', transform: inView3 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref3} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">ASISTENCIA</p>
            <p className="thirdSectionMobileSubtitle">TECNICA</p>
            <p className="thirdSectionMobileSubtitle">INCLUIDA</p>
            <div style={{opacity: progress >= 0.21 && progress <= 0.44 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileP">Lorem ipsum dolor sit amet consectetur. Parturient vel ultrices fermentum interdum lobortis libero volutpat sit nulla. Feugiat sed enim id vulputate libero. Enim aliquam suspendisse arcu vitae imperdiet netus nunc.</p>
        </article>

        <article style={{opacity: inView4 ? 1 : 0, transition: '.5s', transform: inView4 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref4} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">UBICACION</p>
            <p className="thirdSectionMobileSubtitle">ACCESIBLE</p>
            <div style={{opacity: progress >= 0.21 && progress <= 0.44 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileUbi"><LuMapPin color="#ffffff"/> UBICACIÓN ACCESIBLE</p>
        </article>
    </section>
}
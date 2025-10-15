"use client";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { LuMapPin } from "react-icons/lu";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "../context/AppContext";

export const ThirdSectionMobile = () => {

    const {turneraSeleccionada} = useAppContext();

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


    return <section id="thirdSectionMobile"  style={{backgroundColor: turneraSeleccionada === 'simple' ? progress >= 0.15 && progress <= 0.33 ? '#7B2CBF' : '#ffffff' : progress >= 0.16 && progress <= 0.38 ? '#7B2CBF' : '#ffffff', transition: '.5s'}}>
        <h2 id="thirdSectionMobileTitle">¿QUE INCLUYEN?</h2>

        <article style={{opacity: inView1 ? 1 : 0, transition: '.5s', transform: inView1 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref1} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">EQUIPAMIENTO</p>
            <p className="thirdSectionMobileSubtitle">PROFESIONAL</p>
            <div style={{opacity: progress >= 0.15 && progress <= 0.33 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileP">
                En Stream Lab contamos con tecnología de última generación para que tu contenido se vea y suene increíble:
                <span>Cámaras PTZ 4K  BirdDog Max (x4):</span> imagen nítida en calidad broadcast.
                <span>Switcher ATEM Mini Extreme  (Blackmagic):</span> para una realización en vivo fluida y dinámica.
                <span>Luces Ulanzi VL-200Bi:</span> iluminación versátil y profesional para cada escena.
                <span>Consola Zoom PodTrak P8 + micrófonos:</span> sonido cristalino, ideal para podcasts, entrevistas y streaming.
                <span>Ulanzi deck D200 y consola de efectos AX01</span>

                Todo listo para que solo tengas que venir, sentarte y crear.
</p>
        </article>

        <article style={{opacity: inView2 ? 1 : 0, transition: '.5s', transform: inView2 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref2} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">TURNOS</p>
            <p className="thirdSectionMobileSubtitle">DE 2 HORAS</p>
            <div style={{opacity: progress >= 0.15 && progress <= 0.33 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileP">Elegí el día que quieras, reservá y durante dos horas vas a poder dedicarte 100% a tu contenido.</p>
        </article>

        <article style={{opacity: inView3 ? 1 : 0, transition: '.5s', transform: inView3 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref3} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">ASISTENCIA</p>
            <p className="thirdSectionMobileSubtitle">TECNICA</p>
            <p className="thirdSectionMobileSubtitle">INCLUIDA</p>
            <div style={{opacity: progress >= 0.15 && progress <= 0.33 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileP">El alquiler de la sala incluye un operador técnico para asistirte durante toda tu sesión para que vos no tengas que preocuparte por la transmisión, la imagen o el sonido. ¡Recomendamos enviar todo de antemano para que esté listo al momento de tu stream!</p>
        </article>

        <article style={{opacity: inView4 ? 1 : 0, transition: '.5s', transform: inView4 ? 'translateY(0px)' : 'translateY(50px)'}} ref={ref4} className="thirdSectionMobileCard">
            <p className="thirdSectionMobileSubtitle">UBICACION</p>
            <p className="thirdSectionMobileSubtitle">ACCESIBLE</p>
            <div style={{opacity: progress >= 0.15 && progress <= 0.33 ? 1 : 0, transition: '.5s'}} className="thirdSectionMobileLine"></div>
            <p className="thirdSectionMobileUbi"><LuMapPin color="#ffffff"/> Estamos en Arévalo 1462, Palermo Hollywood. <br /> <a style={{color: '#fff'}} target="_blank" href="https://maps.app.goo.gl/peYEpgTiqd64aP276">Fijate como llegar acá!</a></p>
        </article>
    </section>
}
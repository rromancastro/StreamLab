"use client";
import { useState } from "react";
import { MdPlayArrow } from "react-icons/md";

export const FifthSection = () => {

    const [article, setArticle] = useState(1);

    const handleClickPrev = (e) => {
        e.preventDefault();
        setArticle(article === 1 ? 12 : article - 1);
    }

    const handleClickNext = (e) => {
        e.preventDefault();
        setArticle(article === 12 ? 1 : article + 1);
    }

    return <section id="fifthSection">
        {
            article === 1 ? <article className="firstSectionArticle" id="firstSectionArticle1">
                <h2>EL LABORATORIO<br />
                    DE STREAMING
                </h2>
            </article> : article === 2 ? <article className="firstSectionArticle" id="firstSectionArticle2">
                <div className="fifthSectionCard">
                    <p>MICRÓFONOS<br />PROFESIONALES</p>
                </div>
            </article> : article === 3 ? <article className="firstSectionArticle" id="firstSectionArticle3">
                <div className="fifthSectionCard">
                    <p>MICRÓFONOS<br />PROFESIONALES</p>
                </div>
            </article> : article === 4 ? <article className="firstSectionArticle" id="firstSectionArticle4">
                <div className="fifthSectionCard">
                    <p>CÁMARAS HD</p>
                </div>
            </article> : article === 5 ? <article className="firstSectionArticle" id="firstSectionArticle5">
                <div className="fifthSectionCard">
                    <p>CÁMARAS HD</p>
                </div>
            </article> : article === 6 ? <article className="firstSectionArticle" id="firstSectionArticle6">
                <div className="fifthSectionCard">
                    <p>ILUMINACIÓN</p>
                </div>
            </article> : article === 7 ? <article className="firstSectionArticle" id="firstSectionArticle7">
                <div className="fifthSectionCard">
                    <p>ILUMINACIÓN</p>
                </div>
            </article> : article === 8 ? <article className="firstSectionArticle" id="firstSectionArticle8">
                <div className="fifthSectionCard">
                    <p>MONITOREO EN<br />TIEMPO REAL</p>
                </div>
            </article> : article === 9 ? <article className="firstSectionArticle" id="firstSectionArticle9">
                <div className="fifthSectionCard">
                    <p>MONITOREO EN<br />TIEMPO REAL</p>
                </div>
            </article> : article === 10 ? <article className="firstSectionArticle" id="firstSectionArticle10">
                <div className="fifthSectionCard">
                    <p>MONITOREO EN<br />TIEMPO REAL</p>
                </div>
            </article> : article === 11 ? <article className="firstSectionArticle" id="firstSectionArticle11">
                <div className="fifthSectionCard">
                    <p>MONITOREO EN<br />TIEMPO REAL</p>
                </div>
            </article> : article === 12 ? <article className="firstSectionArticle" id="firstSectionArticle12">
                <div className="fifthSectionCard">
                    <p>MONITOREO EN<br />TIEMPO REAL</p>
                </div>
            </article> : null
        }

        {/* buttons */}
        <button onClick={handleClickPrev} className="fifthSectionButton" id="fifthSectionButtonPrev"><MdPlayArrow className="fifthSectionButtonIcon" /></button>
        <button onClick={handleClickNext} className="fifthSectionButton" id="fifthSectionButtonNext"><MdPlayArrow className="fifthSectionButtonIcon" /></button>
    </section>
}
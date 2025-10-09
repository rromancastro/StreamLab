"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactCardFlip from "react-card-flip";
import { MdOutlineWatchLater } from "react-icons/md";

export const S4Card2 = ({x, y, opacity}) => {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.article style={{x, y, opacity}} onMouseEnter={() => setIsFlipped(!isFlipped)} onMouseLeave={() => setIsFlipped(!isFlipped)} className="s4Card">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div id="s4Card2Front" key="front">
                    <p>COMBO
                        <br />
                    MENSUAL</p>
                </div>
                <div id="s4Card2Back" key="back">
                    <p id="s4Card2BackTitle">COMBO
                        <br />
                    MENSUAL</p>

                    <div id="s4Card2BackInfo">
                        <p>4X</p>
                        <p><MdOutlineWatchLater width={18} height={18}/> 2hs</p>
                        <p>1 Turno por semana
                            <br />
                           Lunes a Sábado
                        </p>
                        <p>Precio: <span>$265.000</span></p>
                    </div>

                    <a href="#turneraContainer">Reservar</a>
                </div>
            </ReactCardFlip>
        </motion.article>
    )
}
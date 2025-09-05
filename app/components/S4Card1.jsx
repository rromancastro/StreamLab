"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { MdOutlineWatchLater } from "react-icons/md";

export const S4Card1 = ({x, y, opacity, rotate}) => {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.article style={{x, y, opacity, rotate}} onMouseEnter={() => setIsFlipped(!isFlipped)} onMouseLeave={() => setIsFlipped(!isFlipped)} className="s4Card">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div id="s4Card1Front" key="front">
                    <p>TURNO
                        <br />
                    SIMPLE</p>
                </div>
                <div id="s4Card1Back" key="back">
                    <p id="s4Card1BackTitle">TURNO
                        <br />
                    SIMPLE</p>

                    <div id="s4Card1BackInfo">
                        <p><MdOutlineWatchLater width={18} height={18}/> 2hs</p>
                        <p>1 Turno
                            <br />
                           Lunes a Sábado
                        </p>
                        <p>Precio: <span>$45.000</span></p>
                    </div>

                    <a href="#turneraContainer">Reservar</a>
                </div>
            </ReactCardFlip>
        </motion.article>
    )
}
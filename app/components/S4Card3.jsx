"use client";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";

export const S4Card3 = ({x, y, opacity, rotate}) => {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.article style={{x, y, opacity, rotate}} onMouseEnter={() => setIsFlipped(!isFlipped)} onMouseLeave={() => setIsFlipped(!isFlipped)} id="s4card3" className="s4Card">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div id="s4Card3Front" key="front">
                    <p>EXTRAS</p>
                </div>
                <div id="s4Card3Back" key="back">
                    <p id="s4Card3BackTitle">EXTRAS</p>
                    <p>
                        Pre producción<br />
                        Post producción<br />
                        Edición<br />
                        Hosting en spotify
                    </p>
                    <a target="_blank" href="https://wa.me/541134988192?text=Tu%20mensaje%20aquí">Consultar</a>
                </div>
            </ReactCardFlip>
        </motion.article>
    )
}
import { motion } from "framer-motion";
export const TextUpComponent = ({top, textContent}) => {
    return <div className='animationTextUp'>
                <motion.p style={{top: top}}>{textContent}</motion.p>
        </div>
}
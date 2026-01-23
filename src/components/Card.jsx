import { motion } from "motion/react";
const Card = ({style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
        className="absolute w-15 cursor-grab"
        src={image}
        style={style}
        whileHover={{ scale: 1.05 }}
        drag
        dragConstraints={containerRef}
        dragElastic={1}
        whileDrag={{
          scale: 0.45,
        }}
        dragTransition={{
          bounceStiffness: 450,
        }}
    /> 
  ) : (
    <motion.div 
        className="absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] cursor-grab"
        style={style}
        whileHover={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        drag
        dragConstraints={containerRef}
        dragElastic={1}
        whileDrag={{
          scale: 0.45,
        }}
        dragTransition={{
          bounceStiffness: 450,
        }}
    >
        {text}
    </motion.div>
  )
}

export default Card
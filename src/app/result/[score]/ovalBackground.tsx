'use client';

import { motion } from 'framer-motion';

const OvalBackground = () => {
  return (
    <motion.div
      initial={{
        borderRadius: '0%',
        y: '80%',
      }}
      animate={{
        borderRadius: '50%',
        y: '50%',
      }}
      transition={{
        delay: 0.1,
        type: 'spring',
        damping: 2,
        stiffness: 30,
        restDelta: 0.001,
      }}
      className='absolute bottom-0 z-0 flex h-[100px] w-[110%] translate-y-1/2 flex-col items-center  bg-[#C4E2F9]'
    ></motion.div>
  );
};

export default OvalBackground;

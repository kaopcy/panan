'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

import { cn } from '@/lib/utils';

import { ScoreConfig } from '@/app/result/[score]/page';

const ScoreLevel: FC<{
  scoreVariant: ScoreConfig | undefined;
  scoreNumber: number;
}> = ({ scoreNumber, scoreVariant }) => {
  return (
    <motion.div
      initial={{ scale: 0.7, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        damping: 3,
        stiffness: 30,
        restDelta: 0.001,
      }}
      className={cn(
        'absolute bottom-[-44%] flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full bg-white  text-[44px] font-black',
        scoreVariant?.textColor
      )}
    >
      <span>{scoreNumber}</span>

      <span className='absolute top-[110%] text-[18px] font-bold text-black'>
        ระดับคะแนน
      </span>
    </motion.div>
  );
};

export default ScoreLevel;

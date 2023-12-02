'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

import { cn } from '@/lib/utils';

import { ScoreConfig } from '@/app/result/[score]/page';

const ResultTextCard: FC<{ variant?: ScoreConfig }> = ({ variant }) => {
  return (
    <motion.div className='flex h-[180px] w-full max-w-[320px] flex-col items-center justify-center  space-y-3 rounded-2xl px-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', damping: 2, stiffness: 30 }}
        className='text-[16px] font-bold leading-8 tracking-tighter'
      >
        {variant?.text1}
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', damping: 2, stiffness: 30 }}
        className={cn(
          'whitespace-pre-line px-4 text-center text-[20px] font-bold leading-8 tracking-tighter',
          variant?.textColor
        )}
      >
        {variant?.text2}
      </motion.div>
    </motion.div>
  );
};

export default ResultTextCard;

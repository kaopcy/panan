import React, { FC } from 'react';

import { HTMLMotionProps, motion, useAnimation, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonProps = {
  active?: boolean;
} & HTMLMotionProps<'button'>;

const starVariants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.25,
      type: 'spring',
      stiffness: 175,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.25,
    },
  },
  hovered: {
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const variants: Variants = {
  scale: { scale: [1, 1.06, 1], transition: { duration: 0.2 } },
};

const AnswerButton: FC<ButtonProps> = ({
  children,
  active = false,
  ...props
}) => {
  return (
    <motion.button
      variants={variants}
      animate={active ? 'scale' : ''}
      className={cn(
        'relative  w-full rounded-lg py-2 text-lg font-medium text-white',
        active ? 'bg-button-active' : 'bg-button'
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnswerButton;

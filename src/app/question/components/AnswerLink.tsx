import Link, { LinkProps } from 'next/link';
import React, { FC } from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = {
  className?: string;
  label: string;
} & LinkProps;

const AnswerLink: FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <Link
      className={cn(
        'bg-button flex w-full items-center justify-center rounded-lg py-2 text-lg font-medium text-white',
        className ?? ''
      )}
      {...props}
    >
      <span className=''>{label}</span>
    </Link>
  );
};

export default AnswerLink;

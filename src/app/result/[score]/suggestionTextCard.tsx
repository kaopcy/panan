import React, { FC } from 'react';

import { cn } from '@/lib/utils';

import { ScoreConfig } from '@/app/result/[score]/page';

import CardLite from '~/svg/CardLite.svg';

const SuggestionTextCard: FC<{ variant?: ScoreConfig }> = ({ variant }) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[145px] w-full max-w-[310px] items-center justify-center whitespace-pre-line rounded-[40px] py-6 text-center text-[14px] font-bold tracking-[-0.5px] ',
        variant?.bgColor
      )}
    >
      <CardLite className='absolute -right-1  -top-5 w-[108%]' />

      {variant?.text3}
    </div>
  );
};

export default SuggestionTextCard;

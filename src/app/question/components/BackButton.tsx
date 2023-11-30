import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import PlayButton from '~/svg/PlayButton.svg';

const BackButton: FC<React.ComponentPropsWithRef<'button'>> = (props) => {
  return (
    <button
      className='flex h-10 w-10 shrink-0 items-center gap-4 rounded-full bg-[#749BB1] px-4 py-2 text-[18px] text-[#1E415A]'
      {...props}
    >
      <PlayButton className='h-[12px] w-[10px] rotate-180' />
    </button>
  );
};

export default BackButton;

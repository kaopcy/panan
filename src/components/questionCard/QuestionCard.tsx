import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const QuestionCard: FC<Props> = ({ children }) => {
  return (
    <div className='desktop:max-w-[300px]  desktop:h-[280px] relative h-[300px] w-full max-w-[320px] '>
      <div className=' relative z-10 h-full w-full rounded-2xl bg-white'>
        {children}
      </div>
      <div className='absolute top-7 z-0 h-full w-full scale-90 rounded-2xl  bg-[#2A4D52] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'></div>
    </div>
  );
};

export default QuestionCard;

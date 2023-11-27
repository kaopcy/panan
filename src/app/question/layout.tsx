import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const QuestionLayout: FC<Props> = ({ children }) => {
  const background = () => (
    <div className='absolute h-full w-full'>
      <div className='from h-[60%] w-full bg-gradient-to-b from-[#c5e3f9] to-[#74a2c6]'></div>
      <div className='relative flex h-[40%] w-full flex-col items-center bg-[#C4E2F9]'>
        <div className='absolute top-0 h-[100px] w-[110%]  -translate-y-1/2 rounded-[50%] bg-[#C4E2F9]'></div>
      </div>
    </div>
  );

  return (
    <div className='relative h-full w-full'>
      {background()}
      {children}
    </div>
  );
};

export default QuestionLayout;

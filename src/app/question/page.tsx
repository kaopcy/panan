import AnswerButton from '@/app/question/components/AnswerButton';
import AnswerLink from '@/app/question/components/AnswerLink';
import QuestionCard from '@/components/questionCard/QuestionCard';
import React, { FC } from 'react';

const QuestionTypeSelectorPage: FC = () => {
  return (
    <div className='flex h-full w-full flex-col items-center  '>
      <div className=' z-10  mb-[14%] mt-[12%]    w-full self-start px-11 text-black'>
        <span className='mr-3 text-[32px]'>คำถาม</span>
        <span className='text-[16px] font-medium'>เบื้องต้น</span>
      </div>

      <QuestionCard>
        <div className='flex h-full w-full flex-col items-center justify-center text-center text-[24px] text-[#36698D]'>
          <span>คุณกำลังประสบปัญหา </span>
          <br />
          <span>จากการเล่นพนันของใคร ?</span>
        </div>
      </QuestionCard>

      <div className='z-10 mt-[12%] flex w-full flex-col space-y-4 px-11 '>
        <AnswerLink label='ตัวเอง' href='/question/self'></AnswerLink>
        <AnswerLink label='คนในครอบครัว' href='/question/family/1'></AnswerLink>
      </div>
    </div>
  );
};

export default QuestionTypeSelectorPage;

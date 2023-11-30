'use client';

import AnswerButton from '@/app/question/components/AnswerButton';
import AnswerLink from '@/app/question/components/AnswerLink';
import QuestionCard from '@/components/questionCard/QuestionCard';
import useQuestionStore from '@/store/useQuestionStore';
import { QuestionType } from '@/types/common.type';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

const GenerationSelectorPage: FC = () => {
  const router = useRouter();

  const initQuestion = useQuestionStore((state) => state.initQuestion);

  const onLinkClick = (link: string, questionType: QuestionType) => {
    router.push(link);
    initQuestion(questionType);
  };

  return (
    <div className='flex h-full w-full flex-col items-center  '>
      <div className=' z-10  mb-[14%] mt-[12%]    w-full self-start px-11 text-black'>
        <span className='mr-3 text-[32px]'>คำถาม</span>
        <span className='text-[16px] font-medium'>เบื้องต้น</span>
      </div>

      <QuestionCard>
        <div className='flex h-full w-full flex-col items-center justify-center text-center text-[24px] text-[#36698D]'>
          <span>อายุของคุณอยู่ในช่วงใด ?</span>
        </div>
      </QuestionCard>

      <div className='z-10 mt-[12%] w-full space-y-4 px-11'>
        {/* <AnswerLink label='ไม่เกิน 25 ปี' href='/question/self/young/1' /> */}
        <AnswerButton
          onClick={() => onLinkClick('/question/self/young/1', 'self-young')}
        >
          <span>ไม่เกิน 25 ปี</span>
        </AnswerButton>
        <AnswerButton
          onClick={() => onLinkClick('/question/self/old/1', 'self-old')}
        >
          <span>มากกว่า 25 ปี</span>
        </AnswerButton>
      </div>
    </div>
  );
};

export default GenerationSelectorPage;

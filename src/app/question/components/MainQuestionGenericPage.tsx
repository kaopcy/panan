'use client';

import React, { FC, useEffect } from 'react';

import { Question, QuestionType } from '@/types/common.type';
import { questionsPool } from '@/configs/questions';
import useQuestionStore from '@/store/useQuestionStore';
import { useEffectOnce } from 'react-use';
import { redirect } from 'next/navigation';
import AnswerButton from '@/app/question/components/AnswerButton';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/questionCard/QuestionCard';
import { cn } from '@/lib/utils';

type Props = {
  questionType: QuestionType;
  questionId: string;
};

const MainQuestionGenericPage: FC<Props> = ({ questionType, questionId }) => {
  // const initQuestion = useQuestionStore((s) => s.initQuestionStore);
  const answers = useQuestionStore((s) => s.answers);
  const updateAnswer = useQuestionStore((s) => s.updateAnswer);

  const router = useRouter();

  const pool = questionsPool[questionType];

  useEffectOnce(() => {
    if (questionId !== pool.question[0].id && answers.length == 0) {
      redirect(`${pool.redirectLink}/${pool.question[0].id}`);
    }

    console.log(answers);
  });

  const nextQuestion =
    pool.question[pool.question.findIndex((e) => e.id == questionId) + 1];

  const currentQuestion =
    pool.question[pool.question.findIndex((e) => e.id == questionId)];

  const currentAnswer = answers.find((e) => e.id == questionId);

  const questionCount = () => (
    <div className='absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-[100px] bg-[#E1E1E1] px-3'>
      <div className='text-sm font-medium'>
        {currentQuestion.id}/{pool.question.length}
      </div>
    </div>
  );

  return (
    <div className='flex h-full w-full flex-col items-center  '>
      <div className=' desktop:px-5  z-10 mb-[14%]    mt-[12%] flex w-full flex-col items-start space-y-3 self-start px-8 text-black'>
        <span className='mr-3 text-[32px]'>คำถาม</span>
        <span className='tracking-tighter'>
          <span className='text-[16px] font-normal'>
            แบบประเมินเบื้องต้น สำหรับ
          </span>
          <span className='text-[16px] font-normal text-[#D35565]'>
            คนในครอบครัวที่มีนักพนัน
          </span>
        </span>
      </div>

      <QuestionCard>
        {questionCount()}
        <div className='flex h-full w-full flex-col items-center justify-center px-5 text-center text-[24px] text-black'>
          <div className='text-lg'>{currentQuestion.question}</div>
        </div>
      </QuestionCard>

      <div className='z-10 mt-[12%] w-full space-y-4 px-11'>
        <AnswerButton
          active={currentAnswer ? currentAnswer.answer : false}
          onClick={() => {
            updateAnswer(questionId, true);
            router.push(`${pool.redirectLink}/${nextQuestion.id}`);
          }}
        >
          <div
            className={cn(
              'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white',
              currentAnswer ? currentAnswer.answer : false && 'bg-white'
            )}
          ></div>
          ใช่
        </AnswerButton>
        <AnswerButton
          active={currentAnswer ? !currentAnswer.answer : false}
          onClick={() => {
            updateAnswer(questionId, false);
            router.push(`${pool.redirectLink}/${nextQuestion.id}`);
          }}
        >
          <div
            className={cn(
              'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white',
              currentAnswer ? !currentAnswer.answer : false && 'bg-white'
            )}
          ></div>
          ไม่ใช่
        </AnswerButton>
      </div>
    </div>
  );
};

export default MainQuestionGenericPage;

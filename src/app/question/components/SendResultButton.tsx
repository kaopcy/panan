import { useRouter } from 'next/navigation';
import React, { ButtonHTMLAttributes, FC } from 'react';

import useQuestionStore from '@/store/useQuestionStore';

import { questionsPool } from '@/configs/questions';

import { Score } from '@/types/common.type';

import PlayButton from '~/svg/PlayButton.svg';
import axios from 'axios';

const SendResultButton: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    addtionalOnclick: () => void;
  }
> = ({ addtionalOnclick, ...props }) => {
  const router = useRouter();

  const getScore = useQuestionStore((state) => state.getScore);
  const answer = useQuestionStore((state) => state.answers);
  const questionType = useQuestionStore((state) => state.questionType);

  const onClick = async () => {
    if (!questionType) return;
    const pool = questionsPool[questionType];
    console.log('first');

    const scoreResult: Score = {
      score: getScore(),
      questionType: questionType,
      question: answer.map((e) => ({
        answer: e.answer,
        questionId: e.id,
        questionName: pool.question.find((q) => e.id == q.id)?.question || '',
      })),
    };

    await axios.post('/api/report', scoreResult, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    router.push(`/result/${getScore()}`);
  };

  return (
    <button
      onClick={(e) => {
        addtionalOnclick();
        onClick();
      }}
      className='z-10 flex h-10  items-center gap-4 rounded-[20px] bg-[#749BB1] px-4 text-[18px] text-[#1E415A] disabled:opacity-50'
      {...props}
    >
      <span className='ml-2'>ส่ง</span>
      <PlayButton className='h-[12px] w-[10px]' />
    </button>
  );
};

export default SendResultButton;

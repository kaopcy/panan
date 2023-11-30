'use client';

import { motion, useAnimation, useAnimationControls } from 'framer-motion';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useEffectOnce, useUnmount } from 'react-use';

import { cn } from '@/lib/utils';

import QuestionCard from '@/components/questionCard/QuestionCard';

import useQuestionStore from '@/store/useQuestionStore';

import AnswerButton from '@/app/question/components/AnswerButton';
import BackButton from '@/app/question/components/BackButton';
import SendResultButton from '@/app/question/components/SendResultButton';
import { questionsPool } from '@/configs/questions';

import { QuestionType } from '@/types/common.type';
import Spinner from '@/components/Spinner';

type Props = {
  questionType: QuestionType;
  questionId: string;
};

const onTheRight = { x: '100%' };
const inTheCenter = { x: 0 };
const onTheLeft = { x: '-100%' };

const transition = { duration: 0.4, ease: 'easeInOut' };

const MainQuestionGenericPage: FC<Props> = ({ questionType, questionId }) => {
  const answers = useQuestionStore((s) => s.answers);
  const updateAnswer = useQuestionStore((s) => s.updateAnswer);
  const setPrevQuestionId = useQuestionStore((s) => s.setPreviousQuestionId);
  const previousQuestionId = useQuestionStore((s) => s.previousQuestionId);

  const router = useRouter();

  const pool = questionsPool[questionType];

  useEffectOnce(() => {
    if (questionId !== pool.question[0].id && answers.length == 0) {
      redirect(`/question`);
    }
  });

  useUnmount(() => {
    setPrevQuestionId(questionId);
  });

  const nextQuestion =
    pool.question[pool.question.findIndex((e) => e.id == questionId) + 1];

  const currentQuestion =
    pool.question[pool.question.findIndex((e) => e.id == questionId)];

  const currentAnswer = answers.find((e) => e.id == questionId);

  const isEndOfQuestion =
    questionId == pool.question[pool.question.length - 1].id;

  const questionCount = () => (
    <div className='absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-[100px] bg-[#E1E1E1] px-3'>
      <div className='text-sm font-medium'>
        {currentQuestion.id}/{pool.question.length}
      </div>
    </div>
  );

  type ClickState = 'none' | 'answered' | 'back';

  const [clickState, setClickState] = useState<ClickState>('none');

  const onYesClick = () => {
    updateAnswer(questionId, true);
    setClickState('answered');
  };

  const onNoClick = () => {
    updateAnswer(questionId, false);

    setClickState('answered');
  };

  const onBackClick = () => {
    setClickState('back');
  };

  const onAnimationComplete = () => {
    switch (clickState) {
      case 'answered':
        if (!isEndOfQuestion)
          router.push(`${pool.redirectLink}/${nextQuestion.id}`);
        break;
      case 'back':
        router.back();
        break;
    }
  };

  const animate = useMemo(() => {
    switch (clickState) {
      case 'none':
        return inTheCenter;
      case 'answered':
        return isEndOfQuestion ? inTheCenter : onTheLeft;
      case 'back':
        return onTheRight;
    }
  }, [clickState, isEndOfQuestion]);

  const backdropControl = useAnimationControls();

  return (
    <>
      <div className='flex h-full w-full flex-col items-center  '>
        <div className=' desktop:px-5  z-10 mb-[5%] mt-[12%] flex w-full flex-col items-start space-y-3 self-start px-8 text-black'>
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
          <motion.div
            initial={
              parseInt(currentQuestion.id) < parseInt(previousQuestionId ?? '0')
                ? onTheLeft
                : onTheRight
            }
            animate={animate}
            onAnimationComplete={onAnimationComplete}
            transition={transition}
            className='flex h-full w-full flex-col items-center justify-center px-5 text-center text-[24px] text-black'
          >
            <div className='text-lg'>{currentQuestion.question}</div>
          </motion.div>
        </QuestionCard>

        <div className='z-10 mt-[12%] w-full space-y-4 px-11'>
          <AnswerButton
            active={currentAnswer ? currentAnswer.answer : false}
            onClick={onYesClick}
          >
            <div
              className={cn(
                'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white',
                (currentAnswer ? currentAnswer.answer : false) ? 'bg-white' : ''
              )}
            ></div>
            ใช่
          </AnswerButton>
          <AnswerButton
            active={currentAnswer ? !currentAnswer.answer : false}
            onClick={onNoClick}
          >
            <div
              className={cn(
                'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white',
                (currentAnswer ? !currentAnswer.answer : false)
                  ? 'bg-white'
                  : ''
              )}
            ></div>
            ไม่ใช่
          </AnswerButton>

          <div className='z-10 flex w-full items-center justify-between'>
            <BackButton onClick={onBackClick} />
            {isEndOfQuestion && (
              <SendResultButton
                addtionalOnclick={() => {
                  backdropControl.start({ opacity: '100%', display: 'flex' });
                }}
                disabled={answers.length !== pool.question.length}
              />
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: '0%', display: 'None' }}
        animate={backdropControl}
        className='absolute inset-0 z-20 flex flex-col items-center justify-center bg-white bg-opacity-70'
      >
        <Spinner />
      </motion.div>
    </>
  );
};

export default MainQuestionGenericPage;

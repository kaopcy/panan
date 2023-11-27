import MainQuestionGenericPage from '@/app/question/components/MainQuestionGenericPage';
import QuestionCard from '@/components/questionCard/QuestionCard';
import React, { FC } from 'react';

type Props = {
  params: { question: string };
};

const SelfYoungQuestionPage: FC<Props> = ({ params: { question } }) => {
  return (
    <MainQuestionGenericPage questionId={question} questionType='self-young' />
  );
};

export default SelfYoungQuestionPage;

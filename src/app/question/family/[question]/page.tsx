import React, { FC } from 'react';

import MainQuestionGenericPage from '@/app/question/components/MainQuestionGenericPage';
import { questionsPool } from '@/configs/questions';

type Props = {
  params: { question: string };
};

export async function generateStaticParams() {
  const questions = questionsPool.family.question;

  return questions.map((question) => ({
    question: question.id,
  }));
}

const FamilyQuestionPage: FC<Props> = ({ params: { question } }) => {
  return (
    <MainQuestionGenericPage questionId={question} questionType='family' />
  );
};

export default FamilyQuestionPage;

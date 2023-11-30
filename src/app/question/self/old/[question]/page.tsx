import React, { FC } from 'react';

import MainQuestionGenericPage from '@/app/question/components/MainQuestionGenericPage';
import { questionsPool } from '@/configs/questions';

type Props = {
  params: { question: string };
};

export async function generateStaticParams() {
  const questions = questionsPool['self-old'].question;

  return questions.map((question) => ({
    question: question.id,
  }));
}

const SelfOldQuestionPage: FC<Props> = ({ params: { question } }) => {
  return (
    <MainQuestionGenericPage questionId={question} questionType='self-old' />
  );
};

export default SelfOldQuestionPage;

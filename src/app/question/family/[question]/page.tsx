import React, { FC } from 'react';

import MainQuestionGenericPage from '@/app/question/components/MainQuestionGenericPage';

type Props = {
  params: { question: string };
};

const FamilyQuestionPage: FC<Props> = ({ params: { question } }) => {
  return (
    <MainQuestionGenericPage questionId={question} questionType='family' />
  );
};

export default FamilyQuestionPage;

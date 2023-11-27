import React, { FC } from 'react';

import MainQuestionGenericPage from '@/app/question/components/MainQuestionGenericPage';

type Props = {
  params: { question: string };
};

const SelfOldQuestionPage: FC<Props> = ({ params: { question } }) => {
  return (
    <MainQuestionGenericPage questionId={question} questionType='self-old' />
  );
};

export default SelfOldQuestionPage;

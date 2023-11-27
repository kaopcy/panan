import { create } from 'zustand';

import { Answer, QuestionType } from '@/types/common.type';

type Store = {
  answers: Answer[];
  initQuestionStore: () => void;
  updateAnswer: (id: string, answers: boolean) => void;
  questionType: null | QuestionType;
  updateQuestionType: (newQuestionType: QuestionType) => void;
};

const useQuestionStore = create<Store>()((set) => ({
  initQuestionStore: () => {
    console.log('123');
  },
  answers: [],
  updateAnswer: (id, answer) =>
    set((old) => {
      const newAnswer = { id, answer };

      const indexToUpdate = old.answers.findIndex((item) => item.id === id);

      if (indexToUpdate == -1) {
        return { answers: [...old.answers, newAnswer] };
      } else {
        old.answers[indexToUpdate] = newAnswer;
        return { answers: Object.assign([], old.answers) };
      }
    }),
  questionType: null,
  updateQuestionType: (newQuestionType) =>
    set({ questionType: newQuestionType }),
}));

export default useQuestionStore;

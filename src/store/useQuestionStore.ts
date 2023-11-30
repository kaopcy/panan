import { create } from 'zustand';

import { Answer, QuestionType } from '@/types/common.type';

type Store = {
  initQuestion: (questionType: QuestionType) => void;
  answers: Answer[];
  getScore: () => number;
  updateAnswer: (id: string, answers: boolean) => void;
  questionType: null | QuestionType;
  previousQuestionId: null | string;
  setPreviousQuestionId: (prevId: string) => void;
  updateQuestionType: (newQuestionType: QuestionType) => void;
};

const useQuestionStore = create<Store>()((set, get) => ({
  initQuestion: (questionType: QuestionType) => {
    set({ questionType: questionType, answers: [] });
  },
  answers: [],
  getScore: () => {
    return get().answers.reduce((a, e) => (e.answer ? a + 1 : a + 0), 0);
  },
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
  previousQuestionId: null,
  setPreviousQuestionId: (prevId: string) => {
    set({ previousQuestionId: prevId });
  },
  questionType: null,
  updateQuestionType: (newQuestionType) =>
    set({ questionType: newQuestionType }),
}));

export default useQuestionStore;

export type QuestionType = 'self-young' | 'self-old' | 'family';

export type Question = {
  id: string;
  question: string;
};

export type Answer = {
  id: string;
  answer: boolean;
};

export type Score = {
  score: number;
  questionType: string;
  question: {
    questionId: string;
    questionName: string;
    answer: boolean;
  }[];
};

import { Score } from '@/types/common.type';
import mongoose, { Document, Model } from 'mongoose';

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env;

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  const AnswerSchema = new mongoose.Schema({
    questionId: String,
    questionName: String,
    answer: Boolean,
  });

  const ScoreSchema = new mongoose.Schema({
    score: Number,
    question: [AnswerSchema],
    questionType: String,
  });

  const Score =
    (mongoose.models.Score as Model<ScoreDocument>) ||
    mongoose.model('Score', ScoreSchema);
  return { conn, Score };
};

export type ScoreDocument = Score & Document;

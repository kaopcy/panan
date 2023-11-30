// posts.js

import { NextApiRequest, NextApiResponse } from 'next';

import { connect, ScoreDocument } from '@/lib/mongodb';
import { Score } from '@/types/common.type';

// export default async function handler(req, res) {
//   const client = await clientPromise;
//   const db = client.db("nextjs-mongodb-demo");
//   switch (req.method) {
//     case "POST":
//       let bodyObject = JSON.parse(req.body);
//       let myPost = await db.collection("posts").insertOne(bodyObject);
//       res.json(myPost.ops[0]);
//       break;
//     case "GET":
//       const allPosts = await db.collection("allPosts").find({}).toArray();
//       res.json({ status: 200, data: allPosts });
//       break;
//   }
// }

type E = {
  message: string;
};

export async function POST(req: Request, res: NextApiResponse<E>) {
  const requestBody = (await req.json()) as Score;

  const mongo = await connect();

  const customer = new mongo.Score(requestBody);

  const result = await mongo.Score.insertMany(customer);

  return Response.json({ hello: result });
}

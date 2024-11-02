import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default defineEventHandler(async () => {
  try {
    await client.connect();
    const db = client.db("sample_mflix");// 替换为您的数据库名称
    const collection = db.collection("user_comments");
    const messages = await collection.find().sort({ timestamp: -1 }).toArray();
    return { success: true, data: messages };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, error: "Failed to fetch messages." };
  }
});

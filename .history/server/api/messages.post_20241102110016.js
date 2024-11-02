import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  if (!body.name || !body.content) {
    return { success: false, error: "Name and content are required." };
  }

  try {
    await client.connect();
    const db = client.db("const db = client.db("sample_mflix"); // 替换为您的数据库名称
    const collection = db.collection("user_comments");

    const newMessage = {
      name: body.name,
      content: body.content,
      timestamp: new Date(),
    };

    await collection.insertOne(newMessage);
    return { success: true, message: "Message added successfully." };
  } catch (error) {
    console.error("Error adding message:", error);
    return { success: false, error: "Failed to add message." };
  }
});

import { MongoClient } from "mongodb";

let client;

async function getClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }
  return client;
}

export default defineEventHandler(async () => {
  try {
    const client = await getClient();
    const db = client.db("sample_mflix"); // 替换为您的数据库名称
    const collection = db.collection("user_comments");
    
    const messages = await collection.find().sort({ timestamp: -1 }).toArray();
    const formattedMessages = messages.map((msg) => ({
      id: msg._id.toString(), // 将 _id 转换为字符串格式
      name: msg.name,
      content: msg.content,
      timestamp: msg.timestamp,
    }));
    
    return { success: true, data: formattedMessages };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, error: "Failed to fetch messages." };
  }
});

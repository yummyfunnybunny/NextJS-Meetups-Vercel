// /api.new-meetup
// POST /api/new-meetup
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    console.log("check 1");
    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      `mongodb+srv://admin-jake:${process.env.MONGODB_PASSWORD}@cluster0.wupws.mongodb.net/meetup?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      status: "success",
      message: "Meetup inserted",
    });
  }
};

export default handler;

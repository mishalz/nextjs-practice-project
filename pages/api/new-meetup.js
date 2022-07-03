import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://mishal:tuQhuf-xujhy8-mirtuh@cluster0.3z4p3.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db("Meetups");

    const meetupsCollections = db.collection("meetups");
    const result = await meetupsCollections.insertOne(data);
    console.log(result);
    await client.close();

    res.status(201).json({ message: "Meetup added!" });
  }
};
export default handler;

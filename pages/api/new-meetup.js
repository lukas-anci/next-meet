import { MongoClient } from 'mongodb';

// localhost:3000/api/new-meetup
// cia aprasyti galima prisijungimo slaptazodzius ir kita susijusia info
// cia aprasytas kodas nekeliauja i client narsykle
// mongodb+srv://lukasAdmin:<password>@frankfurtclusteraws.xj0nq.mongodb.net/meetupDb?retryWrites=true&w=majority
async function handler(req, res) {
  console.log(req.method);

  if (req.method === 'POST') {
    const data = req.body;
    console.log('got data in api/new-meetup', data);

    try {
      const client = await MongoClient.connect('your connection');
      const db = client.db();

      // sukurti arba nusitaikyti i esama

      const meetupCollection = db.collection('meetups');
      const insertResult = await meetupCollection.insertOne(data);
      res.status(201).json({ msg: 'success', insertResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.close();
    }
  }
}

export default handler;

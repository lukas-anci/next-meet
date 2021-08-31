import { getCollection } from '../../utils/mongo-data';

// localhost:3000/api/new-meetup
// cia aprasyti galima prisijungimo slaptazodzius ir kita susijusia info
// cia aprasytas kodas nekeliauja i client narsykle

async function handler(req, res) {
  console.log(req.method);

  if (req.method === 'POST') {
    const data = req.body;
    console.log('got data in api/new-meetup', data);
    let client;
    try {
      const [meetupCollection, client] = await getCollection();

      const insertResult = await meetupCollection.insertOne(data);
      res.status(201).json({ msg: 'success', insertResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client && client.close();
    }
  }
}

export default handler;

import { MongoClient } from 'mongodb';

// localhost:3000/api/new-meetup
// cia aprasyti galima prisijungimo slaptazodzius ir kita susijusia info
// cia aprasytas kodas nekeliauja i client narsykle
// mongodb+srv://lukasAdmin:<password>@frankfurtclusteraws.xj0nq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
async function handler(req, res) {
  console.log(req.method);

  if (req.method === 'POST') {
    const data = req.body;
    console.log('got data in api/new-meetup', data);

    const client = await MongoClient.connect(
      'mongodb+srv://lukasAdmin:lukoilas@frankfurtclusteraws.xj0nq.mongodb.net/meetupDb?retryWrites=true&w=majority'
    );
    client.close();
    res.status(200).json({ msg: 'success', data });
  }
}

export default handler;

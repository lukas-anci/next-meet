import MeetupDetail from './../../components/meetups/MeetupDetail';
// import { MongoClient } from 'mongodb';
import { getCollection } from './../../utils/mongo-data';

const MeetupDetails = (props) => {
  return (
    <>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  // nurodo pagal kokia dinamine informacija sugeneruoti statinius puslapius
  // const client = await MongoClient.connect(process.env.MONGO_CONN);
  // const db = client.db();

  // // sukurti arba nusitaikyti i esama

  // const meetupCollection = db.collection('meetups');
  // aprasyti prisijungimo logika ir gauti reikiamas reiksmes
  const [meetupCollection, client] = await getCollection();
  // const meetupCollection = arr[0];
  const allMeets = await meetupCollection.find({}).toArray();
  client.close();
  const pathsArrOfCurrentMeets = allMeets.map((dbObj) => {
    return {
      params: {
        meetupId: dbObj._id.toString(),
      },
    };
  });
  console.log('all meets', pathsArrOfCurrentMeets);
  return {
    fallback: false, //TRUE: jei einam i psl kurio nera aprasyta path tai tas  psl sugeneruojamas uzklausos metu
    // False: jei einam i psl kurio nera aprasyta paths tai gaunam 404
    paths: pathsArrOfCurrentMeets,
  };
}

export function getStaticProps(context) {
  console.log(context.params.meetupId);
  return {
    props: {
      meetupData: {
        id: '',
        title: 'The first meetup',
        image: 'https://picsum.photos/id/1016/1000/800',
        address: 'Some street 5, 113113212, Rome, Italy',
        description: 'This is our first meet in Italy',
      },
      revalidate: 5,
    },
  };
}

export default MeetupDetails;

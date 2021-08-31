import MeetupList from './../components/meetups/MeetupList';
// jei mes importuojam kazka kas bus naudojama tik getServerSideProps arba kitose back fnkcijose
// jie nebuna prideti prie galutinio react componento
import { MongoClient } from 'mongodb';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'The first meetup',
    image: 'https://picsum.photos/id/1016/1000/800',
    address: 'Some street 5, 113113212, Rome, Italy',
    description: 'This is our first meet in Italy',
  },
  {
    id: 'm2',
    title: 'The England meetup',
    image: 'https://picsum.photos/id/1018/1000/800',
    address: 'Downing street 45, 113113212, London, England',
    description: 'This is our first meet in UK',
  },
];
const HomePage = (props) => {
  return (
    <>
      <h1>Home meetup page</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// tam kad puslapis butu sugeneruotas duomenims pasikeitus yra naudojami 2 budai

// SSR server side rendering - duomenys sugeneruojami uzklausos metu, tinka labiau kai duomenys kitna kas sekunde ar greiciau

// export function getServerSideProps(context) {
//   // sitas kodas niekada neatsiudrs pas klienta, cia galima sakyt yra back endas
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// SSG static site generating - duomenys sugeneruojami aplikacijos sukurimo metu ir atnaujinami jei reikia tam tikru intervalu

export async function getStaticProps() {
  // sitas kodas niekada neatsiudrs pas klienta, cia galima sakyt yra back endas
  // fetch, validacija, ir pan
  const client = await MongoClient.connect(process.env.MONGO_CONN);
  const db = client.db();

  // sukurti arba nusitaikyti i esama

  const meetupCollection = db.collection('meetups');

  const allMeets = await meetupCollection.find({}).toArray();
  client.close();
  // console.log('all meets', allMeets);
  const meetsInRequiredFormat = allMeets.map((dbObj) => {
    // _id yra ObjectId tipo ir gausim klaida jei bandysim nuskaityti ji kaip stringa musu jSX
    return {
      id: dbObj._id.toString(),
      title: dbObj.title,
      address: dbObj.address,
      image: dbObj.image,
      description: dbObj.description,
    };
  });
  return {
    props: {
      meetups: meetsInRequiredFormat,
    },
    revalidate: 2, // kas 10 sek duomenys bus atnaujinami
  };
}

export default HomePage;

// jei mes importuojam kazka kas bus naudojama tik getServerSideProps arba getStaticProps ...
// jie nebuna prideti prie galutinio react componento
import MeetupList from '../components/meetups/MeetupList';
import { getCollection } from '../utils/mongo-data';

import Head from 'next/head';
import { SITE_NAME } from './../utils/config';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'The first meetup',
    image: 'https://picsum.photos/id/1016/1000/800',
    address: 'Some street 5, 2328282, Rome, Italy',
    description: 'This is our first meet in Italy',
  },
  {
    id: 'm2',
    title: 'The Engalnd meetup',
    image: 'https://picsum.photos/id/1018/1000/800',
    address: 'Highbury road 5, 2328282, London, England',
    description: 'This is our first meet in UK',
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>All meetups - {SITE_NAME}</title>
        <meta name="description" content="Browse meetups around the world" />
      </Head>
      <h1>Home meetup page</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// tam kad puslapis butu sugeneruotas duomenims pasikeitus yra naudojami 2 budai

// SSR server side rendering getServerSideProps - duomenys sugeneruojami uzklausom metus, tinka labiau kai duomenys kinta kas sekunde ar greiciau
// export function getServerSideProps(context) {
//   // sitas kodas niekada neatsidurs pas clienta, cia galima sakyti yra back end erdve
//   const req = context.req;
//   const res = context.res;
//   // console.log(req);
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
// SSG static site Generatingas getStaticProps() = duomeny sugeneruojami aplikacijos sukurimo metu ir atnaujinami jei reikia tam tikru intervalu
export async function getStaticProps() {
  // sitas kodas niekada neatsidurs pas clienta, cia galima sakyti yra back end erdve
  // fetch, validacija ir pan
  const [meetupCollecion, client] = await getCollection();
  const allMeets = await meetupCollecion.find({}).toArray();
  client.close();
  console.log('All meeets transformed ============');
  // console.log(allMeets);
  const meetsInReqFormat = allMeets.map((dbObj) => {
    // _id yra ObjectId ir gausim klaida jei bandysim nuskaityti ji kaip string jsx
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
      meetups: meetsInReqFormat,
    },
    revalidate: 2, // kas 10 sek duomenys bus atnaujinami
  };
}

export default HomePage;

import MeetupDetail from '../../components/meetups/MeetupDetail';

import { ObjectId } from 'mongodb';
import { getCollection } from '../../utils/mongo-data';
import Head from 'next/head';
import { SITE_NAME } from './../../utils/config';

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>
          {props.meetupData.title} - {SITE_NAME}
        </title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
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

  // aprasyti prisijungimo logika ir gauti reikiamas reiksmes kad musu funkcija (getStaticPaths) veiktu taip pat
  const [meetupCollecion, client] = await getCollection();
  // const meetupCollecion = arr[0];
  // const client = arr[1];

  const allMeets = await meetupCollecion.find({}).toArray();

  client.close();
  console.log('All meeets getStaticPaths ============');
  const pathsArrOfCurrentMeets = allMeets.map((dbObj) => {
    return {
      params: {
        meetupId: dbObj._id.toString(),
      },
    };
  });

  return {
    fallback: 'blocking',
    // TRUE: jei einam i psl kurio nera aprasyta paths tai tas psl sugeneruojamas uzklausom metu
    // blocking: taip pat kaip ir true bet sugeneruos puslapi tada kai tures visus duomenis
    // FALSE: jei einam i psl kurio nera aprasyta paths tai gaunam 404
    paths: pathsArrOfCurrentMeets,
  };
}

export async function getStaticProps(context) {
  console.log(context.params.meetupId);
  const currentId = context.params.meetupId;
  const [meetColletion, client] = await getCollection();
  // surandame viena
  const currentMeetObj = await meetColletion.findOne({
    _id: ObjectId(currentId),
  });
  console.log('currentMeetObj', currentMeetObj);
  client.close();
  return {
    props: {
      meetupData: {
        id: currentId,
        title: currentMeetObj.title,
        image: currentMeetObj.image,
        address: currentMeetObj.address,
        description: currentMeetObj.description,
      },
      revalidate: 1,
    },
  };
}

export default MeetupDetails;

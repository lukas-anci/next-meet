import MeetupDetail from './../../components/meetups/MeetupDetail';

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

export function getStaticPaths() {
  // nurodo pagal kokia dinamine informacija sugeneruoti statinius puslapius
  return {
    fallback: false, //TRUE: jei einam i psl kurio nera aprasyta path tai tas  psl sugeneruojamas uzklausos metu
    // False: jei einam i psl kurio nera aprasyta paths tai gaunam 404
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
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

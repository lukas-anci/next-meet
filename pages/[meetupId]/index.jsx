import MeetupDetail from './../../components/meetups/MeetupDetail';
const MeetupDetails = () => {
  return (
    <>
      <MeetupDetail
        title="The first meetup"
        image="https://picsum.photos/id/1016/1000/800"
        address="Some street 5, 113113212, Rome, Italy"
        description="This is our first meet in Italy"
      />
    </>
  );
};

export default MeetupDetails;

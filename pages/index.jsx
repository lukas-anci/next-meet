import MeetupList from './../components/meetups/MeetupList';

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
const HomePage = () => {
  return (
    <>
      <h1>Home meetup page</h1>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </>
  );
};

export default HomePage;

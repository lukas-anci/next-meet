import MeetupList from './../components/meetups/MeetupList';
import { useState, useEffect } from 'react';

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
  const [meetupsArr, setMeetupsArr] = useState([]);
  useEffect(() => {
    setMeetupsArr(DUMMY_MEETUPS);
  }, []);
  return (
    <>
      <h1>Home meetup page</h1>
      <MeetupList meetups={meetupsArr} />
    </>
  );
};

// tam kad puslapis butu sugeneruotas duomenims pasikeitus yra naudojami 2 budai

// SSR server side rendering - duomenys sugeneruojami uzklausos metu, tinka labiau kai duomenys kitna kas sekunde ar greiciau
// SSG static site generating - duomenys sugeneruojami aplikacijos sukurimo metu ir atnaujinami jei reikia tam tikru intervalu

export default HomePage;

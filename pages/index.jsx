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

export function getServerSideProps(context) {
  // sitas kodas niekada neatsiudrs pas klienta, cia galima sakyt yra back endas
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

// SSG static site generating - duomenys sugeneruojami aplikacijos sukurimo metu ir atnaujinami jei reikia tam tikru intervalu

// export function getStaticProps() {
//   // sitas kodas niekada neatsiudrs pas klienta, cia galima sakyt yra back endas
//   // fetch, validacija, ir pan
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 10, // kas 10 sek duomenys bus atnaujinami
//   };
// }

export default HomePage;

import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SITE_NAME } from './../../utils/config';
const NewMeetup = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    const result = await axios.post('/api/new-meetup', enteredMeetupData);
    console.log('result', result.data);

    result.data && router.push('/');
  }
  return (
    <>
      <Head>
        <title>Create Meetup - {SITE_NAME}</title>
        <meta
          name="description"
          content="Add new meetup and connect around the world"
        />
      </Head>
      <h1>Add new meetup here</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;

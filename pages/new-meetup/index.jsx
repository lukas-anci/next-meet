import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import axios from 'axios';
import { useRouter } from 'next/router';
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
      <h1>Add new meetup here</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;

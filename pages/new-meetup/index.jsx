import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import axios from 'axios';
const NewMeetup = () => {
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    const result = await axios.post('/api/new-meetup', enteredMeetupData);
    console.log('result', result.data);
  }
  return (
    <>
      <h1>Add new meetup here</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;

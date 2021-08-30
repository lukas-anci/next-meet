import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }
  return (
    <>
      <h1>Add new meetup here</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;

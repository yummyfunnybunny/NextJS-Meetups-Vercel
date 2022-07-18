import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://www.farebuzz.com/born-free/wp-content/uploads/2016/02/Boston-17.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://www.farebuzz.com/born-free/wp-content/uploads/2016/02/Boston-17.jpg",
//     address: "Some address 4, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send hhtp request ot fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of higly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// Static Generation
export async function getStaticProps() {
  // fetch data from API/file systems
  const client = await MongoClient.connect(
    `mongodb+srv://admin-jake:${process.env.MONGODB_PASSWORD}@cluster0.wupws.mongodb.net/meetup?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// server side rendering
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from API/file system
//   return {
//     props: DUMMY_MEETUPS,
//   };
// }

export default HomePage;

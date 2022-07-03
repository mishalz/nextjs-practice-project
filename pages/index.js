import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const dummy_meetups = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://images.unsplash.com/photo-1549643276-fdf2fab574f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    address: "5y12, main road",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://images.unsplash.com/photo-1549643276-fdf2fab574f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    address: "5y12, main road",
  },
];
const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mishal:tuQhuf-xujhy8-mirtuh@cluster0.3z4p3.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("Meetups");

  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
}
export default Homepage;

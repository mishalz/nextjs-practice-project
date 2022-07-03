import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const MeetupDetailspage = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      ></MeetupDetail>
    </>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mishal:tuQhuf-xujhy8-mirtuh@cluster0.3z4p3.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("Meetups");

  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    paths: meetups.map((meetup) => {
      return { params: { meetupId: meetup._id.toString() } };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    "mongodb+srv://mishal:tuQhuf-xujhy8-mirtuh@cluster0.3z4p3.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("Meetups");

  const meetupsCollections = db.collection("meetups");
  const meetup = await meetupsCollections.findOne({ _id: ObjectId(meetupId) });
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}
export default MeetupDetailspage;

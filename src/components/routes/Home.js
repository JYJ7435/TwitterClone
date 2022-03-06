import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import Twitt from "../Twitt";
import TwittForm from "../TwittForm";

function Home({ userObject }) {
  const [getTwitt, setGetTwitt] = useState([]);

  // const getTwitts = async () => {
  //   const twitts = await firestore.collection("twitts").get();
  //   // console.log(twitts);
  //   twitts.forEach((item) => {
  //     const twittObject = {
  //       ...item.data(),
  //       id: item.id,
  //     };
  //     setGetTwitt((prev) => [twittObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getTwitts();
    firestore.collection("twitts").onSnapshot((snapshot) => {
      const twittArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGetTwitt(twittArray);
    });
  }, []);

  return (
    <div className="container">
      <TwittForm userObject={userObject} />
      <div style={{ marginTop: 30 }}>
        {getTwitt.map((item) => (
          <Twitt
            key={item.id}
            twittObj={item}
            isOwner={item.creatorId === userObject.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

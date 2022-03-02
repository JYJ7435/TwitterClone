import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";

function Home({ userObject }) {
  const [twitt, setTwitt] = useState("");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("twitts").add({
      text: twitt,
      createdAt: Date.now(),
      creatorId: userObject.uid,
    });
    setTwitt("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTwitt(value);
  };

  // console.log(getTwitt);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={twitt}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Twitt" />
      </form>
      <div>
        {getTwitt.map((item) => (
          <div key={item.id}>
            <h4>{item.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

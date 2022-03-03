import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore, storageService } from "../../firebase";
import Twitt from "../Twitt";

function Home({ userObject }) {
  const [twitt, setTwitt] = useState("");
  const [getTwitt, setGetTwitt] = useState([]);
  const [attachment, setAttachment] = useState();

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
    let attachmentURL = "";
    if (attachment) {
      const fileRef = storageService
        .ref()
        .child(`${userObject.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }
    const twittObj = {
      text: twitt,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      attachmentURL,
    };
    await firestore.collection("twitts").add(twittObj);
    setTwitt("");
    setAttachment("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTwitt(value);
  };

  // console.log(getTwitt);
  const onFileChange = (e) => {
    // console.log(e.target.files);
    const {
      target: { files },
    } = e;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Twitt" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="images" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
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

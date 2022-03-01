import React, { useState } from "react";
import { firestore } from "../../firebase";

function Home(props) {
  const [twitt, setTwitt] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("twitts").add({
      twitt,
      createdAt: Date.now(),
    });
    setTwitt("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTwitt(value);
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
        <input type="submit" value="Twitt" />
      </form>
    </div>
  );
}

export default Home;

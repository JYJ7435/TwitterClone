import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebaseAuth, firestore } from "../../firebase";

function Profile({ refreshUser, userObject }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(
    userObject.displayName || ""
  );

  const onLogOutClick = () => {
    firebaseAuth.signOut();
    history.push("/");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObject.displayName !== newDisplayName) {
      await userObject.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyTwitts = async () => {
    const twitts = await firestore
      .collection("twitts")
      .where("creatorId", "==", userObject.uid)
      .orderBy("createdAt", "desc")
      .get();

    console.log(twitts.docs.map((doc) => doc.data));
  };

  useEffect(() => {
    getMyTwitts();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;

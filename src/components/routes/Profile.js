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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          autoFocus
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
}

export default Profile;

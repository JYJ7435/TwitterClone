import React from "react";
import { useHistory } from "react-router-dom";
import { firebaseAuth } from "../../firebase";

function Profile(props) {
  const history = useHistory();

  const onLogOutClick = () => {
    firebaseAuth.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import Routers from "./components/Routers";
import { firebaseAuth } from "./firebase.js";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setIsLoggedIn(true);
      if (user) {
        setUserObject({
          displayName: user.displayName
            ? user.displayName
            : user.email.split("@")[0],
          email: user.email,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = firebaseAuth.currentUser;
    setUserObject({
      displayName: user.displayName
        ? user.displayName
        : user.email.split("@")[0],
      uid: user.uid,
      email: user.email,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <Routers
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObject={userObject}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;

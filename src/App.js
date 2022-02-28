import { useEffect, useState } from "react";
import Routers from "./components/Routers";
import { firebaseAuth } from "./firebase.js";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <Routers isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;

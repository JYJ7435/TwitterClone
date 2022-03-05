import React from "react";
import { firebaseAuth, githubProvider, googleProvider } from "../../firebase";
import AuthForm from "../AuthForm";

function Auth() {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;

    let provider;
    if (name === "google") {
      provider = googleProvider;
    } else if (name === "github") {
      provider = githubProvider;
    }
    await firebaseAuth.signInWithPopup(provider);
  };
  return (
    <>
      <div>Auth</div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with GitHub
        </button>
      </div>
    </>
  );
}

export default Auth;

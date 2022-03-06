import React from "react";
import { firebaseAuth, githubProvider, googleProvider } from "../../firebase";
import { FaTwitter, FaGoogle, FaGithub } from "react-icons/fa";
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
    <div className="authContainer">
      <FaTwitter className="icons" style={{ marginBottom: 30 }} />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FaGoogle />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with GitHub <FaGithub />
        </button>
      </div>
    </div>
  );
}

export default Auth;

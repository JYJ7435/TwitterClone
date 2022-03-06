import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore, storageService } from "../firebase";
import { FaPlus, FaTimes } from "react-icons/fa";

function TwittForm({ userObject }) {
  const [attachment, setAttachment] = useState();
  const [twitt, setTwitt] = useState("");

  const onSubmit = async (e) => {
    if (twitt === "") {
      return;
    }
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
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={twitt}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FaPlus />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ opacity: 0 }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{ backgroundImage: attachment }}
            alt="images"
          />
          <button className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FaTimes />
          </button>
        </div>
      )}
    </form>
  );
}

export default TwittForm;

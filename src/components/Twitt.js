import React, { useState } from "react";
import { firestore, storageService } from "../firebase";

function Twitt({ twittObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newTwitt, setNewTwitt] = useState(twittObj.text);
  const onDeleteClick = async () => {
    const confirm = window.confirm("Are you sure want to delete this twitt?");
    if (confirm) {
      //Delete Twitt
      await firestore.doc(`twitts/${twittObj.id}`).delete();
      if (twittObj.attachmentURL) {
        await storageService.refFromURL(twittObj.attachmentURL).delete();
      }
    }
  };

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(twittObj, newTwitt);
    await firestore.doc(`twitts/${twittObj.id}`).update({
      text: newTwitt,
    });
    setEdit(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTwitt(value);
  };
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Twitt"
              value={newTwitt}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Twitt" />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{twittObj.text}</h4>
          {twittObj.attachmentURL && (
            <img
              src={twittObj.attachmentURL}
              width="50px"
              height="50px"
              alt="attachmentImage"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Twitt</button>
              <button onClick={toggleEdit}>Edit Twitt</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Twitt;

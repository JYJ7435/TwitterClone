import React, { useState } from "react";
import { firestore, storageService } from "../firebase";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

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
    <div className="twitt">
      {edit ? (
        <>
          <form onSubmit={onSubmit} className="container twittEdit">
            <input
              type="text"
              placeholder="Edit your Twitt"
              value={newTwitt}
              autoFocus
              required
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Twitt" className="formBtn" />
          </form>
          <button onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{twittObj.text}</h4>
          {twittObj.attachmentURL && (
            <img src={twittObj.attachmentURL} alt="attachmentImage" />
          )}
          {isOwner && (
            <div className="twitt__actions">
              <span onClick={onDeleteClick}>
                <FaTrash />
              </span>
              <span onClick={toggleEdit}>
                <FaPencilAlt />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Twitt;

import { FriendsContext, FriendsDispatchContext } from "./FriendsListContext";
import { useState, useRef, useContext, useEffect } from "react";
import { REMOVE_FRIEND, EDIT_FRIEND } from "./Fetch-functions";
export default function FriendsList() {
  const editRef = useRef(null);
  const [isEditing, setIsEditing] = useState(null);
  const dispatch = useContext(FriendsDispatchContext);
  const Friends = useContext(FriendsContext);
  // const [remainingCharacters, setRemainingCharacters] = useState(9);
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (document.activeElement === editRef.current && e.key === "Enter") {
        document.querySelector(".ok-btn").click();
      }
    });
  }, []);
  return (
    <ul>
      {Friends.map(({ name, id }) =>
        isEditing === id ? (
          <div className="editor" key={id}>
            <input
              type="text"
              maxLength={9}
              value={name}
              ref={editRef}
              onChange={() =>
                dispatch({ type: "edit", id: id, edit: editRef.current.value })
              }
            />
            <button className="ok-btn" onClick={() => handleEdit(id)}>
              ok
            </button>
          </div>
        ) : (
          <li key={id}>
            <div className="friend-name">{name}</div>
            <button className="edit-btn" onClick={() => setIsEditing(id)}>
              edit
            </button>
            <button className="remove-btn" onClick={() => handleRemove(id)}>
              remove
            </button>
          </li>
        )
      )}
    </ul>
  );
  function handleRemove(id) {
    try {
      REMOVE_FRIEND(id);
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: "remove",
      id: id,
    });
  }
  function handleEdit(id) {
    try {
      EDIT_FRIEND(id, editRef.current.value);
      setIsEditing(null);
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: "edit",
      id: id,
      edit: editRef.current.value,
    });
  }
}

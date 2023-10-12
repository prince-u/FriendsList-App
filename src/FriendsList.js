import "./FriendsList.css";
import { useReducer, useRef, useState, useEffect } from "react";

function App() {
  const inputRef = useRef(null);
  const editRef = useRef(null);
  const [themeState, setThemeState] = useState(true);
  const [remainingCharacters, setRemainingCharacters] = useState(13);
  const [Friends, dispatch] = useReducer(friendsReducer, InitialFriends);
  const [isEditing, setIsEditing] = useState(null);
  useEffect(() => {
    let currThemeString = localStorage.getItem("themeState");
    let currThemeBoolean;
    if (currThemeString === "true") {
      currThemeBoolean = true;
    } else {
      currThemeBoolean = false;
    }
    if (currThemeString != null) {
      setThemeState(currThemeBoolean);
      currThemeBoolean === true
        ? document.querySelector("body").classList.remove("dark-theme")
        : document.querySelector("body").classList.add("dark-theme");
    }
  }, []);
  return (
    <div className="main">
      <h1>Friends list</h1>
      <button
        onClick={() => {
          setThemeState(!themeState);
          document.querySelector("body").classList.toggle("dark-theme");
          localStorage.setItem("themeState", !themeState);
        }}
      >
        {themeState === true ? "light" : "dark"}
      </button>
      <ul>
        {Friends.map((friend, index) =>
          isEditing === index ? (
            <div className="editor" key={index}>
              <div className="edit-input">
                <input
                  type="text"
                  maxLength={13}
                  value={friend}
                  ref={editRef}
                  onChange={() => editFriend(editRef.current.value, index)}
                />
              </div>
              <button className="ok-btn" onClick={() => setIsEditing(null)}>
                ok
              </button>
            </div>
          ) : (
            <li key={index}>
              <div className="friend-name">{friend}</div>
              <button className="edit-btn" onClick={() => setIsEditing(index)}>
                edit
              </button>
              <button
                className="remove-btn"
                onClick={() => removeFriend(index)}
              >
                remove
              </button>
            </li>
          )
        )}
      </ul>
      <div className="adder">
        <div className="adder-input">
          <input
            type="text"
            onChange={characterCounter}
            maxLength={9}
            ref={inputRef}
          />
        </div>
        <div className="divider"></div>
        <button
          onClick={() =>
            inputRef.current.value !== "" && addFriend(inputRef.current.value)
          }
        >
          add
        </button>
      </div>
      {remainingCharacters < 9 &&
        (remainingCharacters !== 1 ? (
          <p class="character-counter">{`${remainingCharacters} characters remaining`}</p>
        ) : (
          <p class="character-counter">{`${remainingCharacters} character remaining`}</p>
        ))}
    </div>
  );
  function characterCounter() {
    const numOfChar = inputRef.current.value.length;
    setRemainingCharacters(9 - numOfChar);
  }
  function addFriend(name) {
    dispatch({
      type: "add",
      name: name,
    });
    inputRef.current.value = "";
    setRemainingCharacters(13);
  }
  function removeFriend(id) {
    dispatch({
      type: "remove",
      id: id,
    });
  }
  function editFriend(editedFriend, index) {
    dispatch({
      type: "edit",
      id: index,
      edit: editedFriend,
    });
  }
}
export default App;

function friendsReducer(Friends, action) {
  switch (action.type) {
    case "remove": {
      return Friends.filter((friend, id) => id !== action.id);
    }
    case "add": {
      return [...Friends, action.name];
    }
    case "edit": {
      let editedFriends = [...Friends];
      editedFriends[action.id] = action.edit;
      return editedFriends;
    }
    default: {
      throw Error("unidentified type");
    }
  }
}

const InitialFriends = ["Joseph", "Fortune", "Michael", "Morire"];

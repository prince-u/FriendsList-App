import { useState, useRef, useContext, useEffect } from "react";
import { FriendsDispatchContext } from "./FriendsListContext";
import { ADD_FRIEND } from "./Fetch-functions";

export default function FriendAdder() {
  const [remainingCharacters, setRemainingCharacters] = useState(9);
  const inputRef = useRef(null);
  const dispatch = useContext(FriendsDispatchContext);
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (document.activeElement === inputRef.current && e.key === "Enter") {
        document.querySelector("#add-btn").click();
      }
    });
  }, []);
  return (
    <>
      <div className="adder">
        <input
          type="text"
          onChange={characterCounterFunc}
          maxLength={9}
          ref={inputRef}
        />
        <div className="divider"></div>
        <button id="add-btn" onClick={handleAdd}>
          add
        </button>
      </div>
      {remainingCharacters < 9 &&
        (remainingCharacters !== 1 ? (
          <p className="character-counter">{`${remainingCharacters} characters remaining`}</p>
        ) : (
          <p className="character-counter">{`${remainingCharacters} character remaining`}</p>
        ))}
    </>
  );
  function characterCounterFunc() {
    const numOfChar = inputRef.current.value.length;
    setRemainingCharacters(9 - numOfChar);
  }
  function handleAdd() {
    try {
      ADD_FRIEND(inputRef.current.value).then((data) => {
        inputRef.current.value !== ""
          ? dispatch({ type: "add", data: data })
          : alert("you gotta provide a name duhh");
        inputRef.current.value = null;
        setRemainingCharacters(9);
      });
    } catch (err) {
      console.log(err);
    }
  }
}

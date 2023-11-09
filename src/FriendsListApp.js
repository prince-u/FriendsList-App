import "./FriendsListApp.css";
import { useState, useEffect } from "react";
import { FriendsListContext } from "./FriendsListContext";
import FriendsList from "./FriendsList";
import FriendAdder from "./FriendAdder";
import ThemeToggleBtn from "./ThemeToggleBtn";
function App() {
  const [themeState, setThemeState] = useState(true);
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
  function themeStateSetter(val) {
    setThemeState(val);
  }

  return (
    <FriendsListContext>
      <div className="main">
        <h1>Friends list</h1>
        <div className="nav">
          <ThemeToggleBtn
            themeStateSetter={themeStateSetter}
            themeState={themeState}
          />
        </div>
        <FriendsList />
        <FriendAdder />
      </div>
    </FriendsListContext>
  );
}
export default App;

import { createContext, useReducer, useEffect } from "react";

export const FriendsContext = createContext(null);
export const FriendsDispatchContext = createContext(null);

export function FriendsListContext({ children }) {
  const [Friends, dispatch] = useReducer(friendsReducer, []);
  useEffect(() => {
    const GET_FRIEND_DATA = async () => {
      const res = await fetch("http://localhost:5000/Friends");
      const data = await res.json();
      dispatch({ type: "Fetch_Friends", data: data });
    };
    GET_FRIEND_DATA();
  }, []);

  return (
    <FriendsContext.Provider value={Friends}>
      <FriendsDispatchContext.Provider value={dispatch}>
        {children}
      </FriendsDispatchContext.Provider>
    </FriendsContext.Provider>
  );
}

function friendsReducer(Friends, action) {
  switch (action.type) {
    case "remove": {
      return Friends.filter(({ id }) => id !== action.id);
    }
    case "add": {
      return [...Friends, action.data];
    }
    case "edit": {
      let editedFriends = [...Friends];
      editedFriends.forEach((friend) => {
        if (friend.id === action.id) {
          friend.name = action.edit;
        }
      });
      return editedFriends;
    }
    case "Fetch_Friends": {
      return [...Friends, ...action.data];
    }
    default: {
      throw Error("unidentified type");
    }
  }
}

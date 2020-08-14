import React, { useState } from "react";
import "./ChatInput.css";
import db from "../../config/firebase";
import { useStateValue } from "../../contextApi/StateProvider";
import firebase from "firebase";
function ChatInput({ channelName, channelId }) {
  const [message, setMessage] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (event) => {
    event.preventDefault();

    if (channelId) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setMessage("");
  };
  return (
    <div className="chatInput">
      <form>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;

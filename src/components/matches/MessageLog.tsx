import {useParams} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import userContext from "../../contexts/userContext";
import IsLoading from "../common/IsLoading";
import FrienderAPI from "../../api";
import './MessageLog.css'


function MessageLog (){
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  const params = useParams();
  const { matchName } = params;

  const { user } = useContext(userContext);

  useEffect(function getMessages() {
    fetchMessages()
  }, [])


  async function fetchMessages() {
    const messages = await FrienderAPI.getMessages(user.username, matchName);
    setMessages(messages);
    setIsLoaded(true);
  }

  function handleChange(evt){
    const {name, value} = evt.target;
    setMessageText(value);
  }

  async function submitMessage(evt){
    evt.preventDefault();
    await FrienderAPI.addMessage(user.username, matchName, messageText);
    setMessageText("");
    fetchMessages();
  }


  return (<div className='MessageLog'>
    {isLoaded ? <div className='MessageLog-field'>
                  {messages.map(msg =>
                  <p className='MessageLog-message' key={msg.id}><span className='MessageLog-from'> {msg.sender}: </span>{msg.message}</p>)}
                </div>
              :
                <IsLoading />}
    <form onSubmit={submitMessage} className='MessageLog-form'>
      <textarea
        name="message"
        value={messageText}
        placeholder="Type message"
        onChange={handleChange}
      />
      <button className='MatchCard-button' type="submit">Post</button>
    </form>
    </div>
  )
}


export default MessageLog;
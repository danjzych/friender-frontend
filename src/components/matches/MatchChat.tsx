import { useState, useEffect, useContext } from "react";
import userContext from "../../contexts/userContext";
import IsLoading from "../common/IsLoading";
import FrienderAPI from "../../api";
import { MatchInterface } from "../../types/interfaces";

interface MatchChatProps {
  match: MatchInterface;
}


function MatchChat ({ match }: MatchChatProps ) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  const { user } = useContext(userContext);

  useEffect(function getMessages() {
    fetchMessages()
  }, [match])


  async function fetchMessages(): Promise<void>{
    const messages = await FrienderAPI.getMessages(user.username, match.username);
    setMessages(messages);
    setIsLoaded(true);
  }

  function handleChange(evt): void{
    const { name, value } = evt.target;
    setMessageText(value);
  }

  async function submitMessage(evt: React.FormEvent): Promise<void>{
    evt.preventDefault();
    await FrienderAPI.addMessage(user.username, match.username, messageText);
    setMessageText("");
    fetchMessages();
  }

  const messageField = <div className='MessageLog-field'>
    {messages.map(msg =>
    <p className="MessageLog-message" key={msg.id}>
      <span className='MessageLog-from'>
        {msg.sender}:
      </span>
        {msg.message}
    </p>)}
  </div>


  return (<>
      <div className='row-span-4'>
      {isLoaded ? messageField : <IsLoading />}
      </div>
      <form onSubmit={submitMessage} className="row-span-1 flex justify-between items-center px-2 border-t-2 border-neutral-100">
        <textarea
          name="message"
          value={messageText}
          placeholder="Type message"
          onChange={handleChange}
        />
        <button className="btn btn-secondary" type="submit">Send</button>
      </form>
    </>
  )
}


export default MatchChat;
import { useState, useEffect, useContext } from "react";
import userContext from "../../contexts/userContext";
import IsLoading from "../common/IsLoading";
import Chat from "./Chat";
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
    const { value } = evt.target;
    setMessageText(value);
  }

  async function submitMessage(evt: React.FormEvent): Promise<void>{
    evt.preventDefault();
    await FrienderAPI.addMessage(user.username, match.username, messageText);
    setMessageText("");
    fetchMessages();
  }

  const messageField = <div className="flex flex-col h-full gap-3 overflow-y-scroll py-8 px-4">
    {messages.map(msg => <Chat sender={msg.sender} message={msg.message} key={msg.id} />)}
  </div>


  return (<div className="col-span-3">
      <div className="h-[calc(100vh_-_8rem)]">
      {isLoaded ? messageField : <IsLoading />}
      </div>
      <form onSubmit={submitMessage} className="h-16 flex justify-between items-center px-8 border-t-2 border-neutral-100">
        <textarea
          name="message"
          value={messageText}
          placeholder="Say something fun!"
          onChange={handleChange}
          className="w-5/6 h-full border-none overflow-y-scroll resize-none placeholder:text-base-400 focus:outline-none active:text-base-600"
        />
        <button className="btn btn-secondary" type="submit">Send</button>
      </form>
    </div>
  )
}


export default MatchChat;
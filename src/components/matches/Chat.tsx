import { useState, useEffect, useContext } from "react";
import userContext from "../../contexts/userContext";

interface ChatProps {
    sender: string;
    message: string;
}

function Chat({ sender, message }: ChatProps) {
    const { user } = useContext(userContext);


    const userStyles = "self-end bg-primary";
    const matchStyles = "self-start bg-base-200";

    return <div className={`${sender === user.username ? userStyles : matchStyles} py-1 px-2 rounded-xl max-w-md`} >
        <small className="text-sm">
        {message}
        </small>
    </div>
}

export default Chat;
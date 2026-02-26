import "../styles/app.css";

interface ChatBubbleProps {
  message: string;
}

function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className="chat-bubble">
      <p>{message}</p>
    </div>
  );
}

export default ChatBubble;

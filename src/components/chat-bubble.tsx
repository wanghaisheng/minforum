type chatProps = {
  type: 'text' | 'image';
  direction: 'left' | 'right';
  content: string;
  date?: JSX.Element | string;
  toggleImage?: (image: string) => void;
};

const ChatBubble = (props: chatProps) => {
  return (
    <div className={`chat-message ${props.direction}`}>
      <div className={`chat-content ${props.direction}`}>
        {props.type === 'text' ? (
          <div>{`${props.content}`}</div>
        ) : (
          <div
            className="chat-image pointer"
            style={{ backgroundImage: `url("/static/${props.content}")` }}
            onClick={() => props.toggleImage(props.content)}
          >
            &nbsp;
          </div>
        )}
        <div className="time">{props.date}</div>
      </div>
    </div>
  );
};

export default ChatBubble;

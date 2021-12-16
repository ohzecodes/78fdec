import { React, useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  // DONT TOUCH THIS!!
  let [p, setP] = useState(props);
  const { otherUser, userId } = p;
  let { messages } = p;
  useEffect(() => {
    setP(props);
  }, [props.otherUser.id]);
  useEffect(() => {
    messages = props.messages;
  }, [props.messages.length]);

  messages.sort((a, b) => {
    var date1 = new Date(a.createdAt),
      date2 = new Date(b.createdAt);
    if (date1 < date2) return -1;
    else if (date1 > date2) return 1;
    return 0;
  });

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;

import React, { useEffect, useState } from "react";

import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { setTrue } from "../../store/utils/thunkCreators";
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, arrayofOBj } = props;
  const { otherUser } = conversation;
  // console.log(props);

  let obj;
  let c;
  arrayofOBj.forEach((e) => {
    if (e.conversationId === conversation.id) {
      obj = e;
      c = e.count;
    }
  });

  const [count, setcount] = useState(c);
  const handleClick = async (conversation) => {
    setcount(0);
    await props.setActiveChat(conversation.otherUser.username);
    if (c !== 0) {
      console.log("set");
      await setTrue(conversation.id, obj.senderId);
    }
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        countArrObj={props.ArrOj}
        conversation={conversation}
        count={count}
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);

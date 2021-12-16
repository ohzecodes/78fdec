import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    width: 290,
    flexGrow: 0.75,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  count: {
    backgroundColor: "#ADD8E6",
    borderRadius: "50%",
    color: "black",
    paddingRight: 10,
    paddingLeft: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  let m;
  if (props.count !== 0) {
    m = <p className={classes.count}>{props.count}</p>;
  } else {
    m = <p></p>;
  }
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {m}
    </Box>
  );
};

export default ChatContent;

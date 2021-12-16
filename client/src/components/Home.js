import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { user, logout, fetchConversations, conversations } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [count, setcount] = useState(0);
  const getcount = (c) => {
    setcount(c);
  };

  let getText = (text) => {
    setText(text);
  };
  // console.log(text);
  useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  }, [user.id]);

  useEffect(() => {
    console.log("fetch");
    let c = fetchConversations();
  }, [fetchConversations]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }
  let arrayofOBj = [];

  // console.log(props.conversations);

  props.conversations.forEach((e) => {
    let count = 0;
    let Sid;
    let Cid;
    e.messages.forEach((f) => {
      Sid = f.senderId;
      Cid = f.conversationId;
      if (f.hasRead == false && Sid !== user.id) {
        count++;
      }
    });

    let y = {
      count: count,
      senderId: Sid,
      conversationId: Cid,
    };
    arrayofOBj.push(y);
  });

  const handleLogout = async () => {
    await logout(user.id);
  };

  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer arrayofOBj={arrayofOBj} />
        <ActiveChat getText={getText} />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

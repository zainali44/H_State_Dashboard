import React, { useState } from "react";
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Avatar, Input } from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const Testing = () => {
  const classes = useStyles();
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    // Add more chat data as needed
  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
        className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md">
          <Typography variant="h6" noWrap>
            Chat App
          </Typography>
        </div>
        <List>
          {chats.map((chat) => (
            <ListItem
              button
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md"
            >
              {/* Image */}
              <img
                className="rounded-full h-10 w-10"
                src="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="..."
              />
              <ListItemText primary={chat.name} className="text-gray-700 dark:text-white text-sm font-medium" />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {selectedChat ? (
                <div className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md">
                  <Avatar className="rounded-full h-20 w-20" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
                  <Typography variant="h5">{selectedChat.name}</Typography>
                  {/* status */}
                  <div className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md">
                    <span className="bg-gray-500 h-3 w-3 rounded-full" />
                    <Typography variant="body1">Online</Typography>
                  </div>
                </div>
              ) : (
                <Typography variant="h5">Select a chat to start</Typography>
              )}
            </Grid>
          </Grid>
          {selectedChat && (
           <div className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md">
             <input 
              type="text"
              placeholder="Type a message"
              className="w-full h-10 pl-5 pr-4 bg-indigo-100 text-sm border border-blue-gray-200 rounded-lg focus:outline-none focus:border-blue-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:border-opacity-60"
              />
              <Button className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md" color="lightBlue">
                <IoSend className="h-5 w-5" />
              </Button>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Testing;

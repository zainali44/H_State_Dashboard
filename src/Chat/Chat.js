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
import { Avatar, Chip, Input } from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";

import { SidebarWithSearch } from "./Sidebar";

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

const Chat = () => {
  const classes = useStyles();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", text: "Hello, how are you?" },
    { id: 2, sender: "You", text: "I'm good, thanks! How about you?" },
    // Add more dummy messages as needed
  ]);

  const chats = [
    { id: 1, name: "John Doe", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Jane Doe", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    // Add more chat data as needed
  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    // You can fetch chat messages here if needed
    // For now, let's assume you have a messages array for each chat
  };

  const handleSendMessage = () => {
    if (selectedChat) {
      const newMessageObject = {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
      };

      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      setNewMessage("");

      // Use the updated state in the console.log callback
      setMessages((updatedMessages) => {
        console.log(updatedMessages);
        return updatedMessages;
      });
    }
  };

  return (
    <div class="flex h-screen antialiased text-gray-800">
      <div class="flex flex-row h-full w-full overflow-x-hidden">
        <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 dark:bg-gray-900">
          <div class="flex flex-row items-center justify-center h-12 w-full">
            <div
              class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div class="ml-2 font-bold text-2xl dark:text-gray-300">
              Conversations
            </div>
          </div>
          <div class="flex flex-col mt-8">
            <div class="flex flex-row items-center justify-between text-xs">
              <span class="font-bold dark:text-gray-300">
                Active Conversations
              </span>
              <span
                class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >4</span
              >
            </div>
            <div class="flex flex-col space-y-1 mt-4 -mx-2 h-32 overflow-y-auto">
              {
                chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatClick(chat)}
                    class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 dark:hover:bg-gray-800"
                  >
                    <div
                    >
                      <Avatar
                        src={chat.avatar}
                        size="sm"
                      />
                    </div>
                    <div class="ml-2 text-sm font-semibold dark:text-gray-300">
                      {chat.name}
                    </div>
                    <Chip className="ml-10 rounded-full text-gray-800 dark:text-gray-200" color="gray" size="sm" value="2" variant="ghost" />

                  </button>
                ))
              }
            </div>
            <div class="flex flex-row items-center justify-between text-xs mt-2">
              <span class="font-bold dark:text-gray-300">
                Clients</span>
              <span
                class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >7</span
              >
            </div>
            <div class="flex flex-col space-y-1 mt-4 -mx-2">
              <button
                class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 dark:hover:bg-gray-800"
              >
                <div
                  class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                >
                  H
                </div>
                <div class="ml-2 text-sm font-semibold dark:text-gray-300">
                  Henry Boyd</div>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-auto h-full p-6">
          <div
            class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 dark:bg-gray-900"
          >
            {/* <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                    >
                      <Avatar 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      />
                    </div>
                    <div
                      class="relative ml-3 text-sm border ring-1 ring-gray-300 py-2 px-4 shadow rounded-xl"
                    >
                      <div>Hey How are you today?</div>
                    </div>
                  </div>
                </div>
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative mr-3 text-sm bg-gray-300 py-2 px-4 shadow rounded-xl"
                    >
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div>
                
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>Lorem ipsum dolor sit amet !</div>
                    </div>
                  </div>
                </div>
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                      </div>
                      <div
                        class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                      >
                        Seen
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

            {
              selectedChat ? (
                <div class="flex flex-col h-full overflow-x-auto mb-4">
                  <div class="flex flex-col h-full">
                    <div class="grid grid-cols-12 gap-y-2">
                      {
                        messages.map((message) => (
                          <div class="col-start-1 col-end-8 p-3 rounded-lg">
                            <div class="flex flex-row items-center">
                              <div
                                key={message.id}
                                className={`
                                ${message.sender === "You"
                                    ? "self-end text-white"
                                    : "text-gray-800"
                                  }`}
                              >
                                <Avatar
                                  src={message.sender === "You"
                                    ? "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    : selectedChat.avatar
                                  }
                                  size="sm"
                                />

                              </div>
                              <div
                                class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                              >
                                <div>{message.text}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div class="flex flex-col h-full justify-center items-center">
                  <div class="flex flex-col items-center">
                    <div class="font-semibold text-xl mb-4 dark:text-gray-300">
                      QuickChat</div>
                    <div class="text-gray-400">
                      Please select a chat to start messaging
                    </div>
                  </div>
                </div>
              )
            }

            <div
              class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 dark:bg-gray-900"
            >
              <div>
                <button
                  class="flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex-grow ml-4">
                <div class="relative w-full">
                  <input
                    type="text"
                    placeholder="Write a message..."
                    id="send-msg"
                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 dark:bg-gray-900 dark:text-gray-300"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    onClick={handleSendMessage}
                    class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => {
                    // Add logic to handle sending a message
                    if (selectedChat) {
                      setMessages([
                        ...messages,
                        {
                          id: messages.length + 1,
                          sender: "You",
                          text: newMessage,
                        },
                      ]);
                      setNewMessage("");
                      console.log(messages);
                    }
                  }}
                  className="flex items-center justify-center bg-gray-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Chat;

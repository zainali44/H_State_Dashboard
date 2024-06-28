import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Avatar,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithSearch({ chats, handleChatClick }) {

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Real Time Chat
        </Typography>
      </div>
      <div className="p-2">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
      </div>
      <List>
        {chats.map((chat) => (
          <ListItem key={chat.id} onClick={() => handleChatClick(chat)}>
            <ListItemPrefix>
              <Avatar src={chat.avatar} className="border border-gray-500 shadow-xl shadow-gray-900/20 ring-4 ring-gray-500/30" />
            </ListItemPrefix>
            <Typography color="blue-gray">{chat.name}</Typography>
            <ListItemSuffix>
              <Chip color="gray" size="regular" variant="ghost" value="5" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
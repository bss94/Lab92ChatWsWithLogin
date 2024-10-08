import Grid from '@mui/material/Grid2';
import UserList from './components/OnlineUsers/UserList.tsx';
import MessagesList from './components/Messages/MessagesList.tsx';
import ChatForm from './components/ChatForm.tsx';
import {Typography} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../app/hooks.ts';
import {selectUser} from '../users/usersSlice.ts';
import {Message, OnlineUser} from '../../types.ts';

const Chat = () => {
  const ws = useRef<WebSocket | null>(null);
  const user = useAppSelector(selectUser);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      ws.current = new WebSocket(`ws://localhost:8000/chat`);
      ws.current.onclose = () => {
        console.log('WS disconnected');
        setIsOpen(false);
      };
      ws.current.onopen = () => {
        console.log('WS connected');
        if (user) {
          ws.current?.send((JSON.stringify({
            type: 'LOGIN',
            payload: user.token,
          })));
        }
      };
      ws.current.onmessage = (event) => {
        const decodedMessages = JSON.parse(event.data);
        const type = decodedMessages.type as string;
        if (type === 'LOGINED') {
          const users = decodedMessages.payload as OnlineUser[];
          setOnlineUsers(users);
        } else if (type === 'NEW_MESSAGE') {
          const message = decodedMessages.payload as Message;
          setMessages(prevState => [...prevState, message]);
        } else if (decodedMessages.type === 'OLD_MESSAGES') {
          const messages = decodedMessages.payload as Message[];
          setMessages([...messages]);
        } else if (decodedMessages.type === 'DELETED_MESSAGE') {
          const messageId = decodedMessages.payload as string;
          setMessages(prevState => {
            return prevState.filter((message) => message._id !== messageId);
          });
        }
      };
      return () => {
        ws.current?.close();
      };
    } else {
      setTimeout(() => {
        setIsOpen(true);
      }, 1500);
    }

  }, [isOpen]);

  const onSubmit = (message: string) => {
    if (ws.current) {
      ws.current.send(JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: message,
      }));
    }
  };
  const removeMessage = (messageId: string) => {
    if (user?.role === 'admin' || user?.role === 'moderator') {
      if (ws.current) {
        ws.current.send(JSON.stringify({
          type: 'DELETE_MESSAGE',
          payload: messageId,
        }));
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={4}
            border={'solid 1px rgba(0,0,0,0.17)'}
            borderRadius={3}
            sx={{
              px: 2,
              py: 1,
              mb: 2
            }}>
        <Typography variant="h5" textAlign="center">Online Users</Typography>

        <UserList users={onlineUsers}/>
      </Grid>
      <Grid size={8}>
        <MessagesList messages={messages} removeMessage={removeMessage}/>
        <ChatForm onSubmit={onSubmit}/>
      </Grid>

    </Grid>
  );
};

export default Chat;
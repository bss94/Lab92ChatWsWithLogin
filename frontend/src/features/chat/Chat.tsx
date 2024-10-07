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

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/chat`);
    ws.current.onclose = () => {
      console.log('WS disconnected');
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
      }
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  const onSubmit = (message: string) => {
    if (ws.current) {
      ws.current.send(JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: message,
      }));
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
        <MessagesList messages={messages}/>
        <ChatForm onSubmit={onSubmit}/>
      </Grid>

    </Grid>
  );
};

export default Chat;
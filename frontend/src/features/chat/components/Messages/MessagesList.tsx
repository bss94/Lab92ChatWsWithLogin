import Grid from '@mui/material/Grid2';
import {Message} from '../../../../types.ts';
import React from 'react';
import {useAppSelector} from '../../../../app/hooks.ts';
import {selectUser} from '../../../users/usersSlice.ts';
import MessageItem from './MessageItem.tsx';

interface Props {
  messages: Message[];
  removeMessage: (messageId: string) => void;
}

const MessagesList: React.FC<Props> = ({messages, removeMessage}) => {
  const user = useAppSelector(selectUser);
  return (
    <Grid container
          border={'solid 1px rgba(0,0,0,0.17)'}
          borderRadius={3}
          alignContent="start"
          overflow="auto"
          sx={{
            height: 600,
            overflowAnchor: 'auto',
            px: 2,
            py: 1,
            mb: 1
          }}>
      {messages.map((message) => (
        <Grid size={12} key={message._id}>
          <MessageItem message={message} user={user} removeMessage={removeMessage}/>
        </Grid>
      ))}

    </Grid>
  );
};

export default MessagesList;
import Grid from '@mui/material/Grid2';
import {Typography} from '@mui/material';
import {setDate} from '../../../../constants.ts';
import React from 'react';
import {Message, User} from '../../../../types.ts';

interface Props {
  message: Message;
  user: User | null;
}

const MessageItem: React.FC<Props> = ({message, user}) => {
  return (
    <Grid container sx={{
      border: 'solid 1px rgba(0,0,0,0.17)',
      borderRadius: user?._id === message.author._id ? '15px 15px 0 15px' : '15px 15px 15px 0',
      bgcolor: user?._id === message.author._id ? 'rgba(31,186,28,0.27)' : 'rgba(52,133,239,0.2)',
      p: 1,
      mb: 1
    }}>
      <Grid size={9}>
        <Typography variant="h6">
          {message.author.username}:
        </Typography>
      </Grid>
      <Grid size={3}>
        <Typography variant="body2" textAlign='end' sx={{color: 'text.secondary'}}>
          {setDate(message.datetime)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="body2" >
          {message.message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MessageItem;
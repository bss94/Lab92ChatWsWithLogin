import {OnlineUser} from '../../../../types.ts';
import React from 'react';
import Grid from '@mui/material/Grid2';
import {Typography} from '@mui/material';

interface Props {
  user: OnlineUser;
}

const UserListItem: React.FC<Props> = ({user}) => {
  return (
    <Grid>
      <Typography variant="h6">{user.username}</Typography>
    </Grid>
  );
};

export default UserListItem;
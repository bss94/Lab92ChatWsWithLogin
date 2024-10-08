import Grid from '@mui/material/Grid2';
import React from 'react';
import {OnlineUser} from '../../../../types.ts';
import UserListItem from './UserListItem.tsx';

interface Props {
  users: OnlineUser[];
}


const UserList: React.FC<Props> = ({users}) => {
  return (
    <Grid container
          spacing={1}
          direction="column"

    >
      {users.map(user => {
        return (
          <UserListItem key={user._id} user={user}/>
        );
      })}


    </Grid>
  );
};

export default UserList;
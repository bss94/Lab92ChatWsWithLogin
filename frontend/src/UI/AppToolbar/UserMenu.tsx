import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {useNavigate} from 'react-router-dom';
import {User} from '../../types.ts';
import {useAppDispatch} from '../../app/hooks.ts';
import {logout} from '../../features/users/usersThunks.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <Grid>
      <Button onClick={handleClick} color={'inherit'}>
        Hello, {user.username}!
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} keepMounted onClose={handleClose}>
        <MenuItem onClick={userLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;

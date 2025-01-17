import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Avatar, Box, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid2';
import {RegisterMutation} from '../../types.ts';
import {LoadingButton} from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';
import {selectRegisterError, selectRegisterLoading} from './usersSlice.ts';
import {register} from './usersThunks.ts';


const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const registerMutation: RegisterMutation = {
        username: state.username.trim().toLowerCase(),
        password: state.password.trim(),
        confirmPassword: state.confirmPassword.trim(),
      };
      await dispatch(register(registerMutation)).unwrap();
      navigate('/');
    } catch (e) {
    }
  };

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{m: 1, bgcolor: '#2979ff'}}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3, width: 306}}>
        <Grid container direction="column" spacing={2}>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="new-username"
              value={state.username}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('username'))}
              helperText={getFieldError('username')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="new-password"
              value={state.confirmPassword}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('confirmPassword'))}
              helperText={getFieldError('confirmPassword')}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<LoginIcon/>}
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
          <span>Sign up</span>
        </LoadingButton>
        <Link component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
};

export default Register;

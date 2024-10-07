import Grid from '@mui/material/Grid2';
import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';

interface Props {
  onSubmit: (message: string) => void;
}

const ChatForm: React.FC<Props> = ({onSubmit}) => {
  const [state, setState] = useState<string>('');
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };
  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
    setState('');
  };
  return (
    <Grid container
          direction="row"
          component="form"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          onSubmit={submitFormHandler}
    >
      <Grid size={10}>
        <TextField
          required
          fullWidth
          multiline
          minRows={2}
          label="Message"
          id="message"
          name="message"
          value={state}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid size={2}>
        <Button type="submit" variant="contained" fullWidth sx={{height: 65}}> send </Button>
      </Grid>
    </Grid>
  );
};

export default ChatForm;
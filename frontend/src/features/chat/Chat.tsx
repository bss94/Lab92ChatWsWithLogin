import Grid from "@mui/material/Grid2";
import UserList from "./components/OnlineUsers/UserList.tsx";
import MessagesList from "./components/Messages/MessagesList.tsx";
import ChatForm from "./components/ChatForm.tsx";

const Chat = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={4}>
                <UserList/>
            </Grid>
            <Grid size={8}>
              <MessagesList/>
              <ChatForm/>
            </Grid>

        </Grid>
    );
};

export default Chat;
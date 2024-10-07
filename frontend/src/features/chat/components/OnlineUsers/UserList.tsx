import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import React from "react";
import {OnlineUser} from "../../../../types.ts";

interface Props{
    users:OnlineUser[]
}


const UserList:React.FC<Props> = ({users}) => {
    return (
        <Grid container
              spacing={1}
              direction="column"

            >
            {users.map(user=>{
                return(
                    <Grid key={user._id}>
                    <Typography  variant='h6'>{user.username}</Typography>
                </Grid>
                )
            })}


        </Grid>
    );
};

export default UserList;
import {Route, Routes} from 'react-router-dom';
import Layout from './UI/Layout/Layout';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute.tsx';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import {Typography} from '@mui/material';
import {useAppSelector} from './app/hooks.ts';
import {selectUser} from './features/users/usersSlice.ts';
import Chat from './features/chat/Chat.tsx';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute isAllowed={user !== null}>
            <Chat/>
          </ProtectedRoute>
        }/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
      </Routes>
    </Layout>
  );
};

export default App;

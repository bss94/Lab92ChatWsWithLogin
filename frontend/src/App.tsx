import {Route, Routes} from "react-router-dom";
import Layout from "./UI/Layout/Layout";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";

const App = () => {
  const user = useAppSelector(selectUser);
  return (
      <Layout>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isAllowed={user !== null}>
              <Chat user={user} />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Layout>
  )
};

export default App

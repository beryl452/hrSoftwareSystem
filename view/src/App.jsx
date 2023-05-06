import Login from "./pages/Login.jsx";
import Preferences from "./components/Preferences/Preferences.jsx";
import { BrowserRouter, redirect, Route, Routes, useParams } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Vitrine_user from "./components/dashboard/Vitrine_user.jsx";
import Vitrine_project from "./components/dashboard/Vitrine_project.jsx";
import CreateUsers from "./pages/CreateUsers.jsx";
import Users from "./components/dashboard/Users.jsx";
import Projects from "./components/dashboard/Projects.jsx";
import EditUsers from "./pages/EditUsers.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/preferences"
          element={
            <ProtectedRoute>
              <Preferences />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <CreateUsers/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editUser"
          element={
            <ProtectedRoute>
              <EditUsers />
            </ProtectedRoute>
          }
        />
        <Route path="/vitrine_project" element={<Vitrine_project />} />
        <Route path="/vitrine_user" element={<Vitrine_user />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Login from "./pages/Login.jsx";
import Preferences from "./components/Preferences/Preferences.jsx";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
<<<<<<< HEAD
import Vitrine_user from "./components/dashboard/Vitrine_user.jsx";
import Vitrine_project from "./components/dashboard/Vitrine_project.jsx";
import CreateUsers from "./pages/CreateUsers.jsx";
import Users from "./components/dashboard/Users.jsx";
=======
import Register from "./register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
>>>>>>> 84d4aff060e3ed1090a70d0a294d7e93c4dc937a
import Projects from "./components/dashboard/Projects.jsx";
import CreateProject from "./components/projects/CreateProject.jsx";
import EditProject from "./components/projects/EditProject.jsx";
import Tasks from "./components/tasks/Tasks.jsx";
import CreateTask from "./components/tasks/CreateTask.jsx";
import EditTask from "./components/tasks/EditTask.jsx";
import ErrorQuatreCentQuatre from "./pages/ErrorQuatreCentQuatre.jsx";



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
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
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
          path="/project/create"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD
        <Route path="/vitrine_project" element={<Vitrine_project />} />
        <Route path="/vitrine_user" element={<Vitrine_user />} />
=======
        <Route
          exact
          path="/projects/edit/"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/tasks/edit/"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/project/:projectId/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorQuatreCentQuatre />} />
>>>>>>> 84d4aff060e3ed1090a70d0a294d7e93c4dc937a
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import Login from "./pages/Login.jsx";
import Preferences from "./components/Preferences/Preferences.jsx";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Register from "./register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

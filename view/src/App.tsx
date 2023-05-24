import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Projects from './pages/Dashboard/Projects';
import Tasks from './pages/Dashboard/Tasks';
import CreateProjects from './pages/Form/CreateProjects';
import Rapport from './pages/Rapport/Rapport';
import EditTask from './components/EditTask';
import Roles from './pages/Dashboard/Roles';
import Abilities from './pages/Dashboard/Abilities';


// import { useContext } from 'react';
// import { AuthContext } from './context/AuthContext';

function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <ECommerce />
              </ProtectedRoute>
            </AuthProvider>
          }
        />

<Route
          path="/roles"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Roles />
              </ProtectedRoute>
            </AuthProvider>
          }
        />

        <Route
          path="/projects"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/tasks"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
         <Route
          path="/roles/:roleId/abilities"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Abilities />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
         <Route
          path="/tasksEdit"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
         <Route
          path="/CreateProjects"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <CreateProjects />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />

        <Route
          path="/auth/loginform"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />

        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/rapport" element={<Rapport />} />

      </Routes>
    </>
  );
}

export default App;
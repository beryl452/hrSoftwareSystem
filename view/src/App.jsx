import Login from "./pages/Login.jsx";
import Preferences from "./components/Preferences/Preferences.jsx";
import {BrowserRouter, redirect, Route, Routes} from 'react-router-dom';
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Register from "./register.jsx";

function App() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/preferences" element= {
                   <ProtectedRoute>
                       <Preferences/>
                   </ProtectedRoute>
                } />
                <Route path="/register" element= {
                    <ProtectedRoute>
                        <Register/>
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App

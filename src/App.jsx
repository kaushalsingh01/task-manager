import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Component/Auth/Signup";
import Login from "./Component/Auth/Login";
import ProtectedRoute from "./Component/Auth/ProtectedRoute";
import Tasks from "./Component/Tasks/Tasks";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

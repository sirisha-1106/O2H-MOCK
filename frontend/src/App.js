import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffb6c1",
          padding: "20px"
        }}
      >
        <nav className="mb-4">
          <Link
            to="/"
            className="btn btn-dark me-2"
          >
            Dashboard
          </Link>

          <Link
            to="/add"
            className="btn btn-primary"
          >
            Add Task
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/add"
            element={<AddTask />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
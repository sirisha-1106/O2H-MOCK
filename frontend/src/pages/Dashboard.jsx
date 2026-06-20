import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completeTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`, {
        status: "Completed"
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    task => task.status === "Completed"
  ).length;

  const filteredTasks = tasks.filter(task => {

    const statusMatch =
      filter === "All" ||
      task.status === filter;

    const searchMatch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return statusMatch && searchMatch;
  });

  return (
    <div
      className={
        darkMode
          ? "container mt-4 bg-dark text-light p-4"
          : "container mt-4"
      }
      style={
        !darkMode
          ? {
              backgroundColor: "rgba(255,255,255,0.95)",
              padding: "30px",
              borderRadius: "15px",
              boxShadow:
                "0px 4px 15px rgba(0,0,0,0.2)"
            }
          : {}
      }
    >

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>📋 Task Dashboard</h2>

        <button
          className="btn btn-secondary"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "☀ Light Mode"
            : "🌙 Dark Mode"}
        </button>

      </div>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h5>Total Tasks</h5>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h5>Pending Tasks</h5>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h5>Completed Tasks</h5>
            <h2>{completedTasks}</h2>
          </div>
        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search Tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Filter */}

      <select
        className="form-select mb-4"
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
      >
        <option>All</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      {/* Task List */}

      {filteredTasks.length === 0 ? (

        <div className="alert alert-warning">
          No Tasks Found
        </div>

      ) : (

        filteredTasks.map(task => (

          <div
            key={task._id}
            className="card p-3 mb-3"
          >

            <h4>{task.title}</h4>

            <p>{task.description}</p>

            <p>
              <strong>Status:</strong>{" "}
              {task.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(
                task.created_at
              ).toLocaleString()}
            </p>

            <div>

              {task.status !== "Completed" && (
                <button
                  className="btn btn-success me-2"
                  onClick={() =>
                    completeTask(task._id)
                  }
                >
                  Complete
                </button>
              )}

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Dashboard;
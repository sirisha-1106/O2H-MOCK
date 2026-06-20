import React, { useState } from "react";
import API from "../services/api";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Title Required");
      return;
    }

    if (description.length < 20) {
      alert("Description minimum 20 characters");
      return;
    }

    await API.post("/tasks", {
      title,
      description,
      status
    });

    alert("Task Added Successfully");

    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#ffc0cb",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
      }}
    >
      <h2 className="mb-4 text-center">
        Add New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Enter Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          className="form-select mb-3"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Pending</option>
          <option>In Progress</option>
        </select>

        <button className="btn btn-primary w-100">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
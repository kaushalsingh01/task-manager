import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        description: taskDescription,
        createdAt: new Date(),
      });
      alert("Task Added Successfully");
    } catch (err) {
      setError("Error creating task: " + err.message);
    }
  };
  return (
    <div>
      <h2>
        <div>
          <h2>Create New Task</h2>
          <form onSubmit={handleCreateTask}>
            <input
              type="text"
              placeholder="Task Name"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            ></textarea>
            <button type="submit">Create Task</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </h2>
    </div>
  );
};

export default CreateTask;

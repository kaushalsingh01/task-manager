import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
const Tasks = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      console.error("Error logging out: ", error);
      alert("Failed to log out");
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={handleLogout}>Logout</button>
      <CreateTask></CreateTask>
      <TaskList></TaskList>
    </div>
  );
};

export default Tasks;

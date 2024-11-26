import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

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
    </div>
  );
};

export default Tasks
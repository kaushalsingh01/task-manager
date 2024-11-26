import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PropTypes from "prop-types";

const DeleteTask = ({ taskId }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "tasks", taskId));
        alert("Task deleted successfully!");
      } catch (error) {
        console.error("Error deleting task: ", error);
        alert("Failed to delete task");
      }
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

DeleteTask.propTypes = {
  taskId: PropTypes.string.isRequired, // Changed to string for task ID
};

export default DeleteTask;

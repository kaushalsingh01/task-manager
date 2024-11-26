import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PropTypes from "prop-types";

const UpdateTask = ({ taskId }) => {
  const handleUpdateStatus = async () => {
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, {
        status: "completed", // Example field update
      });
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task: ", error);
      alert("Failed to update task");
    }
  };

  return (
    <div>
      <button onClick={handleUpdateStatus}>Update Task</button>
    </div>
  );
};

UpdateTask.propTypes = {
  taskId: PropTypes.string.isRequired, // Ensure taskId is a string
};

export default UpdateTask;

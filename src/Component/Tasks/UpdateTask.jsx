import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PropTypes from "prop-types";

const UpdateTask = ({ taskId, currentStatus }) => {
  const [completed, setCompleted] = useState(currentStatus);

  const handleUpdateStatus = async () => {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc);
    setCompleted(!completed);
  };

  return (
    <div>
      <button onClick={handleUpdateStatus}>
        {completed ? "Mark as Incomplete" : "Mark as Completed"}
      </button>
    </div>
  );
};

UpdateTask.propTypes = {
  taskId: PropTypes.node.isRequired,
  currentStatus: PropTypes.node.isRequired,
};
export default UpdateTask;

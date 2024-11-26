import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PropTypes from "prop-types";

const UpdateTask = ({ taskId }) => {
  const handleUpdateStatus = async () => {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc);
  };

  return (
    <div>
      <button onClick={handleUpdateStatus}></button>
    </div>
  );
};

UpdateTask.propTypes = {
  taskId: PropTypes.node.isRequired,
};
export default UpdateTask;

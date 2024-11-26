import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PropTypes from "prop-types";

const DeleteTask = ({ taskId }) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "tasks", taskId));
    alert("Task deleted successfully!");
  };

  return <button onClick={handleDelete}>Delete</button>;
};

DeleteTask.propTypes = {
  taskId: PropTypes.node.isRequired,
};
export default DeleteTask;

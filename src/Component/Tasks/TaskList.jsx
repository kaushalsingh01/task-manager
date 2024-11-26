import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const tasksQuery = query(collection(db, "tasks"), orderBy("createdAt"));
        const querySnapshot = await getDocs(tasksQuery);

        const fetchedTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Task List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />
      <ul>
        {filteredTasks.length > 0
          ? filteredTasks.map((task) => (
              <li key={task.id}>
                {task.title}: {task.description}
              </li>
            ))
          : !loading && <p>No tasks found.</p>}
      </ul>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default TaskList;

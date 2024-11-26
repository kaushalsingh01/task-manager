import { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 5;
  const fetchTasks = useCallback(
    (loadMore = false) => {
      const tasksQuery = query(
        collection(db, "tasks"),
        orderBy("createdAt"),
        ...(loadMore && lastVisible ? [startAfter(lastVisible)] : []),
        limit(ITEMS_PER_PAGE)
      );

      const unsubscribe = onSnapshot(
        tasksQuery,
        (querySnapshot) => {
          const fetchedTasks = [];
          querySnapshot.forEach((doc) => {
            fetchedTasks.push({ id: doc.id, ...doc.data() });
          });

          if (loadMore) {
            setTasks((prevTasks) => [...prevTasks, ...fetchedTasks]);
          } else {
            setTasks(fetchedTasks);
          }

          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setHasMore(querySnapshot.size === ITEMS_PER_PAGE);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    },
    [lastVisible] // Dependencies of fetchTasks
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMoreTasks = () => {
    if (hasMore) {
      fetchTasks(true);
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Task List</h2>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />
      <ul>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id}>
              {task.title}: {task.description}
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>
      {hasMore && (
        <button
          onClick={loadMoreTasks}
          style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default TaskList;

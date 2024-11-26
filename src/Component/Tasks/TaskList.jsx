import { useEffect, useState } from "react";
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  Modal,
  Form,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { auth } from "../../firebaseConfig"; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async (user) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid) 
      );
      const querySnapshot = await getDocs(q);
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTasks(user); 
      } else {
        setError("No user is logged in.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); 
  }, []); 

  useEffect(() => {
    if (searchQuery) {

      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(lowercasedQuery) ||
          task.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks); 
    }
  }, [searchQuery, tasks]); 


  const handleUpdateOpen = (task) => {
    setSelectedTask(task);
    setUpdatedTask({
      title: task.title,
      description: task.description,
    });
    setShowUpdateModal(true); 
  };


  const handleTaskUpdate = async () => {
    if (selectedTask) {
      try {
        const taskRef = doc(db, "tasks", selectedTask.id);
        await updateDoc(taskRef, updatedTask); 
        setShowUpdateModal(false); 
        setSelectedTask(null); 

        fetchTasks(auth.currentUser);
        setToast({
          show: true,
          message: "Task updated successfully!",
          variant: "success",
        });
      } catch (error) {
        console.error("Error updating task:", error);
        setToast({
          show: true,
          message: "Failed to update task.",
          variant: "danger",
        });
      }
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
      fetchTasks(auth.currentUser); 
      setToast({
        show: true,
        message: "Task deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      setToast({
        show: true,
        message: "Failed to delete task.",
        variant: "danger",
      });
    }
  };

  return (
    <Container>
      {/* Search Input */}
      <InputGroup className="mb-4">
        <FormControl
          placeholder="Search tasks by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <Row className="g-4">
        {loading ? (
          <Col>
            <p>Loading...</p>
          </Col>
        ) : error ? (
          <Col>
            <p>{error}</p>
          </Col>
        ) : filteredTasks.length === 0 ? (
          <Col>
            <p>No tasks found.</p>
          </Col>
        ) : (
          filteredTasks.map((task) => (
            <Col md={4} key={task.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateOpen(task)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Update Task Modal */}
      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={updatedTask.title}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="taskDescription" className="mt-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={updatedTask.description}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={() => setShowUpdateModal(false)}
                className="mx-3"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleTaskUpdate}
                disabled={!updatedTask.title || !updatedTask.description}
              >
                Update Task
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          bg={toast.variant}
          delay={3000}
          autohide
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default TaskList;

import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import TaskList from "./TaskList";
import { getDocs, query, where } from "firebase/firestore";
import {
  Navbar,
  Container,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    createdAt: new Date(),
    uid: auth.currentUser?.uid,
  });
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    variant: "",
  });
  const [tasks, setTasks] = useState([]);

  
  const fetchTasks = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const querySnapshot = await getDocs(
        query(collection(db, "tasks"), where("uid", "==", currentUser.uid))
      );
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowToast({
        show: true,
        message: "Logged out successfully",
        variant: "success",
      });
    } catch (error) {
      setShowToast({
        show: true,
        message: error.message,
        variant: "danger",
      });
    }
  };


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleTaskCreated = async () => {
    try {
      await addDoc(collection(db, "tasks"), newTask);
      fetchTasks();
      setShowModal(false);
      setNewTask({
        title: "",
        description: "",
        createdAt: new Date(),
        uid: auth.currentUser?.uid,
      });


      setShowToast({
        show: true,
        message: "Task created successfully!",
        variant: "success",
      });
    } catch (error) {
      setShowToast({
        show: true,
        message: error.message,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="justify-content-between px-3 d-flex align-items-center"
      >
        <Navbar.Brand href="/" className="fs-3 fw-bold">
          Task Manager
        </Navbar.Brand>
        <Button
          onClick={handleLogout}
          variant="dark"
          className="border border-danger mt-1 mb-1 hover-effect"
          style={{
            backgroundColor: "#495057",
          }}
        >
          Logout
        </Button>
      </Navbar>
      <Container className="d-flex flex justify-content-between mt-4 px-4">
        <p className="fs-4 fw-bold">Task List</p>
        <Button
          variant="primary"
          className="mb-4 rounded-pill btn-success"
          onClick={handleOpenModal}
        >
          Create Task
        </Button>
      </Container>
      <TaskList tasks={tasks} />
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="taskDescription" className="mt-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                name="description"
                value={newTask.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="mx-3"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleTaskCreated}
                disabled={!newTask.title || !newTask.description}
              >
                Create Task
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast.show}
          onClose={() => setShowToast({ ...showToast, show: false })}
          bg={showToast.variant}
          delay={3000}
          autohide
        >
          <Toast.Body>{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Tasks;

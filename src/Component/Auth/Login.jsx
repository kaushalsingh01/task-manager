import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Container, Form, Toast } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowToast({
        show: true,
        message: "Logged in Successfully!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setShowToast({
        show: true,
        message: err.message,
        type: "danger",
      });
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: "400px" }}>
          <Card.Header as="h3" className="text-center">
            Login
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <p>
              Create an account? <Link to="/signup">Sign Up</Link>
            </p>
          </Card.Footer>
        </Card>
      </Container>

      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1050,
        }}
      >
        <Toast
          onClose={() => setShowToast({ show: false })}
          show={showToast.show}
          delay={3000}
          autohide
          bg={showToast.type}
        >
          <Toast.Header>
            <strong className="me-auto text-white">
              {showToast.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{showToast.message}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default Login;

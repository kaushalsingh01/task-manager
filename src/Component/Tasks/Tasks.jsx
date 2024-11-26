import { signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig"   
export const Tasks = () => {
    const handleLogout = async () => {
        await signOut(auth);
        alert("Logout out successfully");
    }
  return (
    <div>
        <h1>Task Manager</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

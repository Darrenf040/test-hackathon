import { useEffect, useState } from "react";
import "./App.css";
import Stream from "./Stream";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    console.log("Users state updated:", users);
  }, [users]);

  return (
    <>
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>No user found</p>
        )}
      </div>
      <Stream />
    </>
  );
}

export default App;

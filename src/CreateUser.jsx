import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
    const [message, setMessage] = useState("");

  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({
            ...currentUser,
            [name]: value,
        });
    };

   
    const handleAddUser = () => {
        if (currentUser.name && currentUser.email) {
            setUsers([...users, currentUser]);
            setCurrentUser({ name: "", email: "" }); 
        } else {
            alert("Please fill out both fields.");
        }
    };
// Handle form submission to the API
    const handleSubmit = async () => {
        try {
            
            const response = await axios.post("http://localhost:5500/user/createUser", {
                users: users, 
            });

            
            if (response.status === 201) {
                setMessage("Users inserted successfully!");
                setUsers([]); 
            }
        } catch (error) {
            
            if (error.response) {
                
                setMessage(error.response.data.message || "Error occurred!");
            } else {
                
                setMessage("There was an error while connecting to the server.");
            }
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add Multiple Users</h1>

          
            <div>
                <input
                    type="text"
                    name="name"
                    value={currentUser.name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                />
                <input
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>

           
            <div>
                <h2>Users to be added:</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            {user.name} - {user.email}
                        </li>
                    ))}
                </ul>
            </div>

           
            <button onClick={handleSubmit}>Submit All Users</button>

           
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateUser;

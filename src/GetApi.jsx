import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetApi = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5500/user/getAllUser')
            .then(res => {
                setData(res.data);
            }).catch(err => {
                console.log("Error fetching users")
            })
    })

    return (
        <div>

            <ul>
                {data && data.map((user, index) => (
                    <li key={index}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
}

export default GetApi;

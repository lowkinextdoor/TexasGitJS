import React, { useEffect, useState } from "react";
import "./User.css";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=9")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading users...</p>;

  return (
    <div className="wrapper">
      <h2 className="title"> Random Users</h2>
      <div className="grid">
        {users.map((user, idx) => (
          <div
            key={idx}
            className={`card ${activeIndex === idx ? "active" : ""}`}
            onClick={() => setActiveIndex(idx)}
          >
            <img src={user.picture.large} alt="User" className="avatar" />
            <h3 className="name">{`${user.name.first} ${user.name.last}`}</h3>
            <p className="info">{user.email}</p>
            <p className="info">{user.phone}</p>
            <p className="info">
              {user.location.city}, {user.location.country}
            </p>
          </div>
        ))}
      </div>
    </div> 
  );
}

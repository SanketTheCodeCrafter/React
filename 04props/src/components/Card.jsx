// src/components/Card.jsx
import React from 'react';
function Card({ username, btnText = "visit me" }) {
  return (
    <div className="card">
      <img
        src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="AirMax Pro"
        className="card-image"
      />
      <div className="card-overlay"></div>
      <div className="card-content">
        <h1 className="card-title">{username}</h1>
        <p className="card-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          debitis?
        </p>
        <button className="card-button">
          {btnText} →
        </button>
      </div>
    </div>
  );
}

export default Card;

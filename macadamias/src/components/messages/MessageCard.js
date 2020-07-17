import React from 'react';
import './MessageCard.css';

const MessageCard = ({message}) => {
  return (
    <div className="card mb-3" style={{ maxWidth: 500 }}>
      <div className="row no-gutters">
        <div className="imgButton__container">
          <img src={require("../../images/messages/profile_icon.png")} className="card-img" alt="Profile Icon" />
          <button type="button" className="btn btn-success btn-sm">Add</button>
        </div>
        <div className="">
          <div className="card-body">
            <h5 className="card-title">{message.user.username} <small className="text-muted">{message.date}</small> <button type="button" className="btn btn-secondary btn-sm">edit</button></h5>
            <p className="card-text">
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageCard;
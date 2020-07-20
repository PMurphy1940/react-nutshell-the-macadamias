import React from 'react';
import './MessageCard.css';

const MessageCard = ({message, activeUserId, userFriends, editMessageId}) => {
  // Maps through each friends object in userFriends array and grabs the userId and stores the array of user's friends id in variable
  const userFriendsId = userFriends.map(friend => friend.userId)

  // Add friend button includes hidden attribute that toggles to 'true' when user id in message matches the active user id in storage session OR when user id in message matches id found in user's friends id array. Add button is only visible to messages belonging to people who are not already friends of the active user.
  // Edit button includes hidden attribute that toggles to 'true' when user id in message DOES NOT match the active user id in session storage. Editing is only available to the active user, cannot edit other people's messages.
  return (
    <div className="card mb-3" style={{ maxWidth: 500 }}>
      <div className="row no-gutters">
        <div className="imgButton__container">
          <img src={require("../../images/messages/profile_icon.png")} className="card-img" alt="Profile Icon" />
          <button type="button" className="btn btn-success btn-sm" hidden={message.userId === activeUserId || userFriendsId.includes(message.userId) ? true : false}>Add</button>
        </div>
        <div className="">
          <div className="card-body">
            <h5 className="card-title">{message.user.username} <small className="text-muted">{message.date}</small> <button type="button" className="btn btn-secondary btn-sm" hidden={message.userId !== activeUserId ? true : false} onClick={() => editMessageId(message.id)}>edit</button></h5>
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
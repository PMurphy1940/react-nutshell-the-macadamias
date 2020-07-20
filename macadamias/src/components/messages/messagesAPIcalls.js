const remoteURL = 'http://localhost:5002'

export default {
  // API method retrieves all messages including active user, friends, and strangers
  async getAll() {
    const response = await fetch(`${remoteURL}/messages?_expand=user`)
    const result = await response.json()
    return result
  },
  // API method sending a new message object to the database
  async post(newMessageObj) {
    const response = await fetch(`${remoteURL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessageObj)
    })
    const result = await response.json()
    return result
  },
  // API method retrieves a single message from the database per id
  async get(id) {
    const response = await fetch(`${remoteURL}/messages/${id}?_expand=user`)
    const result = await response.json()
    return result
  },
  // API method updates existing message with edited version
  async update(editedMessageObj) {
    const response = await fetch(`${remoteURL}/messages/${editedMessageObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedMessageObj)
    })
    const result = await response.json()
    return result
  },
  // API method retrieves all of active user's friends
  async getUserFriends(activeUserId) {
    const response = await fetch(`${remoteURL}/friends?activeUserId=${activeUserId}`)
    const result = response.json()
    return result
  }
}

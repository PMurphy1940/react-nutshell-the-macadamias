const remoteURL = 'http://localhost:5002'

export default {
  async getAll() {
    const response = await fetch(`${remoteURL}/messages?_expand=user`)
    const result = await response.json()
    return result
  },
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
  }
}

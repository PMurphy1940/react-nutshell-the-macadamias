const remoteURL = 'http://localhost:5002'

export default {
  async getAll() {
    const response = await fetch(`${remoteURL}/messages?_expand=user`)
    const result = await response.json()
    return result
  }
}

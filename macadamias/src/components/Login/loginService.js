
const URL_USERS = "http://localhost:5002/users"
const loginService = {
    async getUser(id){
        let result = await fetch(`${URL_USERS}/${id}`)
        .then(res=>res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
        return result;
    },
    async addUser(data){
        let result = await fetch(`${URL_USERS}`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
        return result;
    },
    async searchUser(search){
        let result = await fetch(`${URL_USERS}?email_like=${search}`)
        .then(res=>res.json())
        .then(res=>res)
        .catch(err=>console.log(err))
        return result;
    }
}
export default loginService;
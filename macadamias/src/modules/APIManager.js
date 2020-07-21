//APIManager 
//Author: David Bruce

const remoteURL = "http://localhost:5002";

export default {
    postObject(newObjEntry, basetable) {
        return fetch(`${remoteURL}/${basetable}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObjEntry)})
            .then((response) => {
              return response.json();
                })
    },
    deleteObject(id, basetable) {
        return fetch(`${remoteURL}/${basetable}/${id}`, {
            method: "DELETE"})
            .then((response) => {
                return response.json();
                  })
      },
    getAllforOneUser(userId, basetable) {
        return fetch(`${remoteURL}/users/${userId}/?_&embed=${basetable}`)
        .then((response) => {
            return response.json();
              })
  },
  getAllforComponent(basetable) {
      return fetch(`${remoteURL}/${basetable}`)
      .then((response) => {
          return response.json();
            })
  },
    getSingleObjectById(id, basetable) {
        return fetch(`${remoteURL}/${basetable}/${id}`)
        .then((response) => {
            return response.json();
              })
  },
    getFriendsForEvents(activeUserId) {
        return fetch(`${remoteURL}/friends?activeUserId=${activeUserId}&_expand=user`)
        .then((response) => {
          console.log(response.ok)
            return response.json();
              })
  },
  getUserInfoByEmail(userEmail) {
    return fetch(`${remoteURL}/users?email=${userEmail}`)
    .then((response) => {
        return response.json();
          })
  },  
    getAllUsersFriendsAndComponentItems(componentTable) {
        return fetch(`${remoteURL}/users?_embed=${componentTable}&_embed=friends`)
        .then((response) => {
            return response.json();
              })
  },
  update(editedObject,basetable) {
      return fetch(`${remoteURL}/${basetable}/${editedObject.id}`, {
        method: "PUT",                    
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedObject)
      }).then(response => response.json())
    },
   async getFriends(id){
     let result =  await fetch(`http://localhost:5002/friends?activeUserId=2&_expand=user`)
      .then(res=>res.json())
      .then(res=>res)
      return result
    },
    async searchUsers(search){
      let result = await fetch(`http://localhost:5002/users?username_like=${search}`)
      .then(res=>res.json())
      .then(res=>res)
      return result
    },
   async deleteFriend(id){
    let res = await fetch(`http://localhost:5002/friends/${id}`, {
      method: "DELETE",
      headers:{
        'Content-Type':"application/json"
      }
    })
    .then(res=>res.json())
    .then(res=>res)
    return res
    }
    
   
}


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
    getFriends(activeUserId) {
        return fetch(`${remoteURL}/friends?activeUserId=${activeUserId}&_expand=user`)
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
    }
   
}


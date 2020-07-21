//Author => Patrick Murphy
//This module supplies all the API calls for the News Feed section of React Nutshell//

const remoteURL = 'http://localhost:5002'

export default {
    

    getUserFriends(id)  {
        return fetch(`${remoteURL}/friends?activeUserId=${id}`)
        .then(response => response.json())
    },
    getUserAndFriendsNews(searchList) {
        return fetch(`${remoteURL}/news?${searchList}&_expand=user`)
        .then(response => response.json())
    },
    getArticleToEdit(id) {
        return fetch(`${remoteURL}/news/${id}`)
        .then(response => response.json())
    },
    postNewArticle(articleObject) {
        return fetch(`${remoteURL}/news/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(articleObject)
        }).then(data => data.json())
    },
    updateArticle(id, articleObject) {
        return fetch(`${remoteURL}/news/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(articleObject)
        }).then(data => data.json())
    },

    deleteArticle(id) {
        return fetch(`${remoteURL}/news/${id}`, {
            method: "DELETE"
        }).then(result => result.json())
    }
}

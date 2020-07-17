const remoteURL = 'http://localhost:5002'

export default {
    getUserNews (id)  {
        return fetch(`${remoteURL}/users/${id}?_embed=news`)
    },
    getUserFriendsNews (friendsIds) {
        return fetch(`${remoteURL}/news?${friendsIds}`)
    }
}

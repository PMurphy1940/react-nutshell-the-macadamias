const remoteURL = 'http://localhost:5002'

export default {
    getUserAndFriendNews (id)  {
        return fetch(`${remoteURL}/users/${id}?_embed=news`)
    },
    getUserFriendsNews (id) {
        return fetch(`${remoteURL}/friends?activeUserId=${id}&_expand=user``)
    }
}
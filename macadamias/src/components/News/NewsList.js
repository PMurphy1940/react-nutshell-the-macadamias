import React, { useState, useEffect } from 'react';
import NewsAPIManager from "./NewsAPIManager"
import NewsItemDisplay from "./NewsItemDisplay"


const NewsFeed = (props) => {
    //Initial news state is empty//
const [news, setNews] = useState([])
const [friends, setFriends] = useState([])

const activeUser = JSON.parse(sessionStorage.credentials).activeUserId

const userFriends = () => {
    return NewsAPIManager.getUserFriends(2)
    .then(result => {
        setFriends(result)

    })
}

const getUserAndFriendsNews = () => {
    return NewsAPIManager.getUserNews(2)
    .then(newsFromAPI => {
        setNews(newsFromAPI)
    })
}
const newsSearchString = () => {
    friends.forEach(friend => {
        
    })
}

useEffect(() => {
    userFriends();
}, [])
console.log(activeUser)
console.log("User Friends", friends)


return(
    <>
   {(news.news !== undefined) && 
   <>
    {news.news.map(newsItem =>
            <NewsItemDisplay
            key={newsItem.id}
            newsItem={newsItem}          
            {...props} />)}
    </>
   }
    </>
)




}
export default NewsFeed
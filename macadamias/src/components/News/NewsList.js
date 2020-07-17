import React, { useState, useEffect } from 'react';
import { getUserNews, getUserFriendsNews } from "./NewsAPIManager"


const NewsFeed = (props) => {
    //Initial news state is empty//
const [news, setNews] = useState([])

const userNews = () => {
    return getUserNews(sessionStorage.activeUserId)
    .then(newsFromAPI => {
        setNews(newsFromAPI)
    })
}

useEffect(() => {
    userNews();
}, [])
console.log("User News", userNews)


return(
    <>
    {userNews.map(newsItem => <NewsItemDisplay key={newsItem.id} newsItem={newsItem} />)}
    </>
)




}
export default NewsFeed
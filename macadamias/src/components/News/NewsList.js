import React, { useState, useEffect } from 'react';
import NewsAPIManager from "./NewsAPIManager"
import NewsItemDisplay from "./NewsItemDisplay"
import ArticleForm from "./NewsArticleForm"



const NewsFeed = (props) => {
    // let APISearchQuerry = ``
    //Initial news state is empty//
const [news, setNews] = useState([])
const [friends, setFriends] = useState([])
const [isEditing, setIsEditing] = useState(false)

const editArticle = () => {

}
    //Get the Active User ID number from session storage??
const activeUser = JSON.parse(sessionStorage.credentials).activeUserId

    //Fetch the user ID numbers of all the Active User's Friends//
const getFriends = () => {
     NewsAPIManager.getUserFriends(activeUser)
    .then(friends => {
        setFriends({
            ...friends
        })       
        //Once the API call is returned, produce a querry string consisting of the friends Id's to send to the News API//
        if (friends !== undefined) {
                newsSearchString(friends)
        }
    });
}

    //Function the convert the friends Id's into a string to search for their news articles and then GET those articles//
const newsSearchString = (friends) => {
    let APISearchQuerry = `userId=${activeUser}`
    friends.forEach(friend => {
       APISearchQuerry += `&userId=${friend.userId}`

    })
    // console.log("API String", APISearchQuerry)
    getRelationalNews(APISearchQuerry)
}

    //Finally GET the news articles//
const getRelationalNews = (APISearchQuerry) => {
    return NewsAPIManager.getUserAndFriendsNews(APISearchQuerry)
    .then(newsFromAPI => {
        //sort the news array to put in descending order starting with the newest article//
        newsFromAPI.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
        setNews(newsFromAPI)
    })
}


useEffect(() => {
    getFriends();
}, [])

// useEffect(() => {
//     getRelationalNews();
// }, [])

const handleDiscard = () => {
    setIsEditing(false)
}



return(
    
    < >
        <button type="button" hidden={isEditing} onClick={() => {setIsEditing(true)}}>Post new article</button>
         { isEditing && 
            <ArticleForm {...props} handleDiscard={handleDiscard} />
         }
        {(news !== undefined) && 
          <div>
            {news.map(newsItem =>
                <NewsItemDisplay
                key={newsItem.id}
                newsItem={newsItem}
                activeUser={activeUser}
                editArticle={editArticle}          
                {...props} />)}
          </div>
         }
    </>
)




}
export default NewsFeed
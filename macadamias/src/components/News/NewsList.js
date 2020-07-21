//Author => Patrick Murphy
//This module GETs the user and user friends news article then routes those returns to generate the NewsFeed view//

import React, { useState, useEffect } from 'react';
import NewsAPIManager from "./NewsAPIManager"
import NewsItemDisplay from "./NewsItemDisplay"
import ArticleForm from "./NewsArticleForm"
import RequiredModal from "../Modal"
import Authentication from "../Auth/Authentication"



const NewsFeed = (props) => {

        //Initial news state is empty//
    const [news, setNews] = useState([])
    const [friends, setFriends] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [articleToEdit, setArticleToEdit] = useState([])
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [formType, setFormType] = useState("isPost")
    const [deleteId, setdeleteId] = useState(0)
    const toggle = () => setConfirmDeleteModal(!confirmDeleteModal);
    const toggleEdit = () => setIsEditing(!isEditing)


    const editArticle = (id) => {
        setIsEditing(true)
        let findArticleToEdit = news.find(newsArticle => {
        return (newsArticle.id === id)
        })
        setFormType("isEdit")
        
        setArticleToEdit(findArticleToEdit)
        }

        //Get the Active User ID number from session storage??
    const activeUser = JSON.parse(sessionStorage.credentials).id

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

        //Function that converts the friends Id's into a string to search for their news articles and then GET those articles//
    const newsSearchString = (friends) => {
        let APISearchQuerry = `userId=${activeUser}`
        friends.forEach(friend => {
        APISearchQuerry += `&userId=${friend.userId}`

        })
        getRelationalNews(APISearchQuerry)
    }

        //Finally GET the news articles//
    const getRelationalNews = (APISearchQuerry) => {
        return NewsAPIManager.getUserAndFriendsNews(APISearchQuerry)
        .then(newsFromAPI => {
            //sort the news array to put in descending order starting with the newest article//
            newsFromAPI.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
            //Here comes the render//
            setNews(newsFromAPI)
        })
    }


    useEffect(() => {
        getFriends();
    }, [])

    //A couple of functions to pass down to children//
    const handleDiscard = () => {
        setFormType("isPost")
        setIsEditing(false)
    }

        //Delete part 1 - brings up the confirm modal//
    const confirmDelete = (id) => {
        setdeleteId(id)
        setConfirmDeleteModal(true)
    }
        //Delete part 2 - on 'Confirm' move forward and complete the delete operation//
    const handleDelete = () => {
        setConfirmDeleteModal(false)
        NewsAPIManager.deleteArticle(deleteId)
        .then(() => getRelationalNews())
    }



return(   
    < >
    <div className="news__Container">
      <div className="news__header">
        <h5>Great articles by great people with great internet research skills</h5>
        <button className="news_Button" type="button" hidden={isEditing} onClick={() => {setIsEditing(true)}}>Post new article  &#x270D;</button>
         { isEditing && 
            <ArticleForm {...props} 
                handleDiscard={handleDiscard} 
                toggleEdit={toggleEdit} 
                articleToEdit={articleToEdit}
                formType={formType}
                getRelationalNews={getRelationalNews}
                />
         } 
      </div>
      <div className="news__Articles">
        {(news !== undefined) && 
          <div>
            {news.map(newsItem =>
                <NewsItemDisplay
                key={newsItem.id}
                newsItem={newsItem}
                activeUser={activeUser}
                editArticle={editArticle}
                confirmDelete={confirmDelete}          
                {...props} />)}
          </div>
         }
         </div>
         <RequiredModal 
                toggle={toggle} 
                confirmDeleteModal={confirmDeleteModal}  
                handleDelete={handleDelete}
                deleteId={deleteId}
                modalType="Delete"/>
      </div>
    </>
)




}
export default Authentication(NewsFeed)
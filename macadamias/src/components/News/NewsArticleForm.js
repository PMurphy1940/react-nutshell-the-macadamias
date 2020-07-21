//Author => Patrick Murphy
//This module supplies the input fields for the creation or editing of an Article//

import React, { useState, useEffect} from 'react';
import NewsAPIManager from "./NewsAPIManager";
import RequiredModal from "../Modal"

const ArticleForm = (props, userId="", url="", title="", synopsis="" ) => {
    const [newsArticle, setNewsArticle] = useState({ userId: userId, url: url, title: title, synopsis: synopsis, date: ""})
    const [isLoading, setIsLoading] = useState(true)
    const activeUser = JSON.parse(sessionStorage.credentials).activeUserId
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
   
    const handleFieldChange = event => {
        //As long as you've typed something, arm the submit button//
        setIsLoading(false)
        //capture the values being entered//
        let target = event.target
        let {name, value} = target
        setNewsArticle({...newsArticle, [name]: value})
        
    }
    //Determine if the use of this page is for POSTing a new article, or PUTing an edited article//
    useEffect(() => {
        if (props.formType === "isEdit") {
            NewsAPIManager.getArticleToEdit(props.articleToEdit.id)
            .then(newsArticle => {
                setNewsArticle({
                    ...newsArticle
                });
                setIsLoading(false)
            })
        }}, [props.articleToEdit.id])

    // Verify the voracity of the fields and if true, construct the Article object to send to the API//
    const makeNewArticle = event => {
        event.preventDefault();

        if (newsArticle.url === "" || newsArticle.title === "" || newsArticle.synopsis === "") {
            //call the required fields modal from Modal.js if any field is blank//
            setModal(true);          
        }
        else{
            //construct the object to ship to JSON//
            setIsLoading(true)
            let newsArticleObject = {
                userId: activeUser,
                url: newsArticle.url,
                title: newsArticle.title,
                synopsis: newsArticle.synopsis,
                date: new Date()
            } 
            //Shut the edit window//      
            props.toggleEdit()

            //Logic for deciding POST or PUT//
            if (props.formType === "isEdit") {
                NewsAPIManager.updateArticle(props.articleToEdit.id, newsArticleObject)
                .then(() => props.getRelationalNews());
            }
             
            else if (props.formType === "isPost") {
              NewsAPIManager.postNewArticle(newsArticleObject)
                .then(() => props.getRelationalNews());
            }}            
        }
        
    return (
        <>
         <form>
             <fieldset>
               <div className="formgrid">                
                <input
                    onChange={handleFieldChange}
                    type="url"
                    name="url"
                    value={newsArticle.url}
                    id="url"
                    />
                <label htmlFor="url">Article URL address</label>                
                <input
                    onChange={handleFieldChange}    
                    type="text"
                    name="title"
                    value={newsArticle.title}
                    maxLength="47"
                    id="title"
                    />
                <label htmlFor="title">Article Title</label>               
                <input
                    onChange={handleFieldChange}
                    type="text"
                    name="synopsis"
                    value={newsArticle.synopsis}
                    id="synopsis"
                    />
                <label htmlFor="synopsis">Article synopsis</label>
                <div className="button__Space">
                    <button className="news_Button" type="button" onClick={props.handleDiscard} >
                         Discard &#x1F5D1;
                    </button>
                    <button className="news_Button" disabled={isLoading} type="button" onClick={makeNewArticle} >
                         Submit &#x270D;
                    </button>
            </div>  
              </div>
            </fieldset>
            
         </form>
         <RequiredModal toggle={toggle} modal={modal} modalType="Required"/>
        </>
    )
}

export default ArticleForm
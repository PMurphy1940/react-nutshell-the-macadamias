import React, { useState } from 'react';
import NewsAPIManager from "./NewsAPIManager";
// import { Button, } from 'reactstrap'
import RequiredModal from "../Modal"




const ArticleForm = (props, userId="", url="", title="", synopsis="" ) => {
    const [newsArticle, setNewsArticle] = useState({ userId: userId, url: url, title: title, synopsis: synopsis, date: ""})
    const [isLoading, setIsLoading] = useState(true)
    const activeUser = JSON.parse(sessionStorage.credentials).activeUserId

    const handleFieldChange = event => {
        let target = event.target
        let {name, value} = target
        setNewsArticle({...newsArticle, [name]: value})
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const makeNewArticle = event => {
        event.preventDefault();
        // setNewsArticle({...newsArticle, date: new Date(), userId: activeUser})
        if (newsArticle.url === "" || newsArticle.title === "" || newsArticle.synopsis === "") {
            setModal(true);          
        }
        else{
        let newsArticleObject = {
            userId: activeUser,
            url: newsArticle.url,
            title: newsArticle.title,
            synopsis: newsArticle.synopsis,
            date: new Date()
        }
        // props
        NewsAPIManager.postNewArticle( newsArticleObject)
        }
    }
    return (
        <>
         <form>
             <fieldset>
               <div className="formgrid">
                <label htmlFor="title">Article URL address</label>
                <input
                    onChange={handleFieldChange}
                    type="url"
                    name="url"
                    value={newsArticle.url}
                    id="url"
                    />
                <label htmlFor="title">Article Title</label>
                <input
                    onChange={handleFieldChange}    
                    type="text"
                    name="title"
                    value={newsArticle.title}
                    id="title"
                    />
                <label htmlFor="synopsis">Article synopsis</label>
                <input
                    onChange={handleFieldChange}
                    type="text"
                    name="synopsis"
                    value={newsArticle.synopsis}
                    id="synopsis"
                    />
                <div className="button__Space">
                    <button className="news_Button" onClick={props.handleDiscard} >
                         Discard &#x1F5D1;
                    </button>
                    <button className="news_Button" onClick={makeNewArticle} >
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
import React, { useState } from 'react';
import NewsAPIManager from "./NewsAPIManager";
import { Button, } from 'reactstrap'
import RequiredModal from "../Modal"




const ArticleForm = (props, userId="", url="", title="", synopsis="" ) => {
    const [newsArticle, setNewsArticle] = useState({ userId: userId, url: url, title: title, synopsis: synopsis, date: ""})
    const [isLoading, setIsLoading] = useState(true)

    const handleFieldChange = event => {
        let target = event.target
        let {name, value} = target
        setNewsArticle({...newsArticle, [name]: value})
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const makeNewArticle = event => {
        console.log("News Article", newsArticle)
        event.preventDefault();
        if (newsArticle.url === "" || newsArticle.title === "" || newsArticle.synopsis === "") {
            setModal(true);          
        }
        NewsAPIManager.postNewArticle(newsArticle)
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
                <label htmlFor="title">Article URL address</label>
                <input
                    onChange={handleFieldChange}    
                    type="text"
                    name="title"
                    value={newsArticle.title}
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
              </div>
            </fieldset>
            <div className="d-flex justify-content-end">
                    <Button onClick={props.handleDiscard} variant="outline-success">
                         Discard
                    </Button>
                    <Button onClick={makeNewArticle} variant="outline-success">
                         Submit
                    </Button>
            </div>
         </form>
         <RequiredModal toggle={toggle} modal={modal} modalType="Required"/>
        </>
    )
}

export default ArticleForm
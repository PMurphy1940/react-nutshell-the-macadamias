//Author => Patrick Murphy
//This module supplies the JSX card for each mapped news article from NewsList.js//

import React from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import shared from "../MiscSharedFunctions"
import "./News.css"

const NewsItemDisplay = (props) => {
  return (
      <>
       <Card className="news_Card">
       
         <CardBody className={(props.activeUser === props.newsItem.userId) ? "active__User__News" : "friend__User__News"}>
            
            <div className="user_News_Cont">
                <CardTitle>{props.newsItem.user.username}</CardTitle>
                <p className="news__Title">{props.newsItem.title}</p>
                <p>{shared.dateConverter(props.newsItem.date)}</p>
            </div>
            <div className="tinyLink" >
            <CardText>{props.newsItem.synopsis}</CardText>       
            <ReactTinyLink
                className="TinyLink_Element"
                cardSize="small"
                showGraphic={true}
                maxLine={3}
                minLine={2}
                url={props.newsItem.url}
            />
            </div>
            <div className="button__Space">
                    { (props.activeUser === props.newsItem.userId) &&
                <button className="news_Button" onClick={() => props.confirmDelete(props.newsItem.id)}>Delete &#x1F5D1;</button>}
                    { (props.activeUser === props.newsItem.userId) &&
                <button className="news_Button" onClick={() => props.editArticle(props.newsItem.id)}>Edit &#x270D;</button>}          
            </div>
         </CardBody>
        </Card>     
    </>
  );
};

export default NewsItemDisplay;


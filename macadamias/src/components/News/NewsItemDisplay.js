import React from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import {
  Card, CardText, CardBody,
  CardTitle, Button
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
                <p>{shared.dateConverter(props.newsItem.date)}</p>
            </div>
            <CardText>{props.newsItem.synopsis}</CardText>
           
          <ReactTinyLink
                className="TinyLink_Element"
                cardSize="small"
                showGraphic={true}
                maxLine={4}
                minLine={2}
                url={props.newsItem.url}
            />
            <div className="user_News_Cont">
            { (props.activeUser === props.newsItem.userId) &&
            <button onClick={() => props.editArticle(props.newsItem.id)}>Edit</button>}
            { (props.activeUser === props.newsItem.userId) &&
            <button onClick={() => props.deleteArticle(props.newsItem.id)}>Delete</button>
                }
            </div>
         </CardBody>
        </Card>
     
    </>
  );
};

export default NewsItemDisplay;


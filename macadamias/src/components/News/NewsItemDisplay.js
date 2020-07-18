import React from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import "./News.css"

const NewsItemDisplay = (props) => {
  return (
      <>
       <Card>
         <CardBody className={(props.activeUser === props.newsItem.userId) ? "active__User__News" : "friend__User__News"}> 
          <CardTitle>{props.newsItem.user.username}</CardTitle>
          <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={props.newsItem.url}
            />    
         </CardBody>
        </Card>
     
    </>
  );
};

export default NewsItemDisplay;


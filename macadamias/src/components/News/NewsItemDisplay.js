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
       <Card>
         <CardBody className={(props.activeUser === props.newsItem.userId) ? "active__User__News" : "friend__User__News"}>
            <div>
            <CardTitle>{props.newsItem.user.username}</CardTitle>
            <CardText>{props.newsItem.synopsis}</CardText>
            </div>
          <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={4}
                minLine={3}
                url={props.newsItem.url}
            />
            <p>{shared.dateConverter(props.newsItem.date)}</p>
            { (props.activeUser === props.newsItem.userId) &&
            <Button onClick={() => props.editArticle(props.newsItem.id)}>Edit</Button>
                }
         </CardBody>
        </Card>
     
    </>
  );
};

export default NewsItemDisplay;


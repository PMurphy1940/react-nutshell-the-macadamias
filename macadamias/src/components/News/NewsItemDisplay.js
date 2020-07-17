import React from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const NewsItemDisplay = (props) => {
  return (
      <>
       <Card>     
         <CardBody>
          <CardTitle>user name</CardTitle>
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


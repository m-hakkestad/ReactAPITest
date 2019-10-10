import React from 'react';
import './styles.scss';
import { Card, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';

import TimeAgo from 'javascript-time-ago'
class Comment extends React.Component{
  constructor(props){
      super(props);

    const timeAgo = new TimeAgo('en');
      var date = timeAgo.format(new Date(props.data.date));
      this.state = {
          data: props.data,
          formDate: date
      }
  }


  render(){
    return(
         <Card className="comment">
            <Row>
                <Col>
                    <CardText className="comment-date">{this.state.formDate} ID:{this.state.data.id}</CardText>
                </Col>
            </Row>

            <Row>
                <Col>
                    <CardText>{this.state.data.text}</CardText>
                </Col>
            </Row>

            <Row>
            </Row>

         </Card>
    )
  }
}
export default Comment;
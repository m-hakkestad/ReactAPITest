import React from 'react';
import './styles.scss';
import { Card, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';

class Comment extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          data: props.data
      }
  }


  render(){
      console.log(this.state)
    return(
         <Card className="comment">
            <Row>
                <Col>
                    <CardText className="comment-date">{this.state.data.formdate} ID:{this.state.data.id}</CardText>
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
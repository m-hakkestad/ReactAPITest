import React from 'react';
import { Card, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';
import './styles.scss';
import {FaHeart, FaComments, FaRetweet} from 'react-icons/fa';

class SocialCard extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      id: props.post.id,
      text: props.post.text,
      comments: props.post.comments,
      likes: props.post.likes,
      retweets: props.post.retweets,
      user: props.post.user
    }
  }


  render(){
    return(
      <Card className="socialCard">

        <Row className="socialCard-top-row">
          <Col>
            <CardImg className="socialCard-profile-picture float-left" top width="2%" src={this.state.user.profileImg}/>
          </Col>
          <Col className="socialCard-names float-left">
            <CardTitle className="socialCard-names-name" >{this.state.user.name}</CardTitle>
            <CardSubtitle className="socialCard-names-username">@{this.state.user.username}</CardSubtitle>
          </Col>
        </Row>

        <Row className="socialCard-mid-row">
          <Col>
            <CardText>{this.state.text}</CardText>
          </Col>
        </Row>

        <Row className="socialCard-bottom-row">
          <Col className="socialCard-bottom-row-info"><FaHeart className="socialCard-bottom-row-icon"/>{this.state.likes}</Col>
          <Col className="socialCard-bottom-row-info"><FaComments className="socialCard-bottom-row-icon"/>{this.state.comments}</Col>
          <Col className="socialCard-bottom-row-info"><FaRetweet className="socialCard-bottom-row-icon"/>{this.state.retweets}</Col>
        </Row>
        
      </Card>
    )
  }
}
export default SocialCard;

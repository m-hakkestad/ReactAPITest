import React from 'react';
import { Card, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';
import './styles.scss';
import {FaComment} from 'react-icons/fa';
import Upvote from '../sub-components/Upvote';
import Downvote from '../sub-components/Downvote';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)



class SocialCard extends React.Component{
  constructor(props){
    super(props);
    const timeAgo = new TimeAgo('en');
    this.updateScore = this.updateScore.bind(this);

    let inDate = timeAgo.format(new Date(props.post.date))
    this.state = {
      id: props.post.id,
      text: props.post.text,
      date: inDate,
      score: props.post.score,
      commentids: props.post.commentids,
      comments: props.post.comments,
      update: false
    }
  }

  updateScore(inScore){
    this.setState({
      score: this.state.score + inScore
    })
  }


  render(){
    return(
      <Card className="socialCard">

        <Row className="socialCard-top-row">
          <Col>
            <CardText className="socialCard-date">{this.state.date} ID:{this.state.id}</CardText>
          </Col>
        </Row>

        <Row className="socialCard-mid-row">
          <Col>
            <CardText>{this.state.text}</CardText>
          </Col>
        </Row>

        <Row className="socialCard-bottom-row">
          <Col className="socialCard-bottom-row-info"><Upvote id={this.state.id} onChange={this.updateScore.bind(this)}/></Col>
          <Col className="socialCard-bottom-row-info">{this.state.score}</Col>
          <Col className="socialCard-bottom-row-info"><Downvote id={this.state.id} onChange={this.updateScore.bind(this)}/></Col>
          <Col className="socialCard-bottom-row-info"><FaComment/>{this.state.commentids.length}</Col>
        </Row>

      </Card>
    )
  }
}
export default SocialCard;

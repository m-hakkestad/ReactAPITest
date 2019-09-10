import React from 'react';
import { Card, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';
import './style.scss';
import {FaHeart, FaComments, FaRetweet} from 'react-icons/fa';

class SocialCard extends React.Component{
  constructor(props){
    super(props);

    this.getUser = this.getUser.bind(this);

    this.state = {
      id: props.data,
      fetched: false,
    }
  }

  getUser(){
    let url = 'http://10.0.0.187:3004/users?userid='
    url += this.state.userid;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(inData => this.setState({
      name: inData[0].name, username: inData[0].username, profileImg: inData[0].profileImg
    }));
  }

  componentDidMount(){
    let url = 'http://10.0.0.187:3004/posts?postid='
    url += this.state.id
    fetch(url)
    .then(response => response.json())
    .then(inData => this.setState({
      userid: inData[0].userid, text: inData[0].text, comments: inData[0].comments, likes: inData[0].likes, retweets: inData[0].retweets, fetched: true
    }, () => {this.getUser()}));

  }

  componentDidUpdate(){

  }


  render(){
    if(this.state.fetched){
      return(
        <Card className="socialCard">
          <Row className="socialCard-top-row">
            <Col>
              <CardImg className="socialCard-profile-picture float-left" top width="2%" src={this.state.profileImg}/>
            </Col>

            <Col className="socialCard-names float-left">
              <CardTitle className="socialCard-names-name" >{this.state.name}</CardTitle>
              <CardSubtitle className="socialCard-names-username">@{this.state.username}</CardSubtitle>
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
    else{
      return <div>Fetching post</div>
    }
  }
}
export default SocialCard;

import React from 'react';
import { Card, Button, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';
import './style.scss';
import {FaHeart, FaComments, FaRetweet} from 'react-icons/fa';
import myData from '../../json/db.json'

class SocialCard extends React.Component{
  constructor(props){
    super(props);
    this.state = props;
  }

  componentDidMount(){
    let url = 'https://my-json-server.typicode.com/m-hakkestad/data/posts/'
    url += this.state.data
    fetch(url)
    .then(response => response.json())
    .then(inData => this.setState({data: inData, fetched: true}));
  }

  render(){
    return(
      <Card className="socialCard">
        <Row className="socialCard-top-row">
          <Col>
            <CardImg className="socialCard-profile-picture float-left" top width="2%" src="https://i.pravatar.cc/75"/>
          </Col>

          <Col className="socialCard-names">
            <CardTitle className="socialCard-names-name" >{this.state.data.name}</CardTitle>
            <CardSubtitle className="socialCard-names-username">@{this.state.data.username}</CardSubtitle>
          </Col>
        </Row>

        <Row className="socialCard-mid-row">
          <Col>
            <CardText>{this.state.data.text}</CardText>
          </Col>
        </Row>

        <Row className="socialCard-bottom-row">
          <Col className="socialCard-bottom-row-info"><FaHeart className="socialCard-bottom-row-icon"/>{this.state.data.likes}</Col>
          <Col className="socialCard-bottom-row-info"><FaComments className="socialCard-bottom-row-icon"/>{this.state.data.comments}</Col>
          <Col className="socialCard-bottom-row-info"><FaRetweet className="socialCard-bottom-row-icon"/>{this.state.data.retweets}</Col>
        </Row>
      </Card>
    )
  }
}
export default SocialCard;

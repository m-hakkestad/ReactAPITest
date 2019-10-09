import React from 'react';
import './styles.scss';
import Comment from './Comment'
import { Card, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';

class Comments extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          data: props
      }
  }


  render(){
    return(
         <Card>{this.state.data.data.comments.map(comment => <Comment data={comment} key={comment.id}/>)}</Card>
    )
  }
}
export default Comments;
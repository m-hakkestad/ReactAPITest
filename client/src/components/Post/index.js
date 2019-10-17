import React from 'react';
import {Redirect} from 'react-router-dom'
import './styles.scss';
import SocialCard from '../SocialCard/SocialCard';
import Comments from '../Comments'
import CommentModal from '../Modal/CommentModal'
import {Button} from 'reactstrap';

class Post extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    if(!(typeof this.props.location.postProps === 'undefined')){
      this.state = {
        data : props.location.postProps.data,
        render: true,
        newComment: false
      }
    }else{
      this.state = {
        render: false
      }
    }
    this.toggleNewComment = this.toggleNewComment.bind(this);
  }

  toggleNewComment(){
    this.setState(prevState => ({
      newComment: !prevState.newComment
    }))
    this.forceUpdate();
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }


  render(){
    if(this.state.render){
      return (
        <div className="post">
          <SocialCard className="post-og" post={this.state.data} flow={false}/>
          <Button className="post-button" onClick={this.toggleNewComment} color="primary" size="lg">Add Comment</Button>
          <Comments id={this.state.data.id}/>
          <CommentModal open={this.state.newComment} onChange={this.toggleNewComment.bind(this)} id={this.state.data.id}/>
        </div>
      )
    }else{
      return <Redirect to='/'/>
    }
  }
}
export default Post;
import React from 'react';
import {Redirect} from 'react-router-dom'
import './styles.scss';
import SocialCard from '../SocialCard/SocialCard';
import Comments from '../Comments'

class Post extends React.Component{
  constructor(props){
    super(props);
    if(!(typeof this.props.location.postProps === 'undefined')){
      this.state = {
        data : props.location.postProps.data,
        render: true
      }
    }else{
      this.state = {
        render: false
      }
    }
    
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }


  render(){
    if(this.state.render){
      return (
        <div className="post">
          <SocialCard className="post-og" post={this.state.data} flow={false}/>
          <Comments data={this.state.data}/>
        </div>
      )
    }else{
      return <Redirect to='/'/>
    }
  }
}
export default Post;
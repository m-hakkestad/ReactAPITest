import React from 'react';
import './style.scss';
import NewPostsManager from '../CardManagers/NewPostsManager';
import PopularPostsManager from '../CardManagers/PopularPostsManager';
import Post from '../Post';
import Header from '../Header';
import Footer from '../Footer';
import Modal from '../Modal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      newPost: false,
      post: true
    }

    this.toggleNewPost = this.toggleNewPost.bind(this);
    this.togglePostOrComment = this.togglePostOrComment.bind(this);
  }

  toggleNewPost(){
    this.setState(prevState=> ({
      newPost: !prevState.newPost
    }))
    this.forceUpdate();
  }

  togglePostOrComment(){
    this.setState(prevState=> ({
      post: !prevState.post
    }))
    this.forceUpdate();
  }

  render(){
    return(
        <div >
          <Router>
            <Header title={window.location.href.replace("http://localhost:3000/","")}/>
            <Route exact path="/" component={NewPostsManager}/>
            <Route exact path="/hot" component={PopularPostsManager}/>
            <Route exact path="/post/:id" component={Post}/>
            <Modal open={this.state.newPost} onChange={this.toggleNewPost.bind(this)} post={this.state.post}/>
            <Footer onChange={this.toggleNewPost.bind(this)} togglePost={this.togglePostOrComment.bind(this)}/>
          </Router>
            
        </div>
        
    )
  }
}
export default Main;

import React from 'react';
import './style.scss';
import NewPostsManager from '../CardManagers/NewPostsManager';
import PopularPostsManager from '../CardManagers/PopularPostsManager';
import Post from '../Post';
import Header from '../Header';
import Footer from '../Footer';
import PostModal from '../Modal/PostModal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      newPost: false
    }

    this.toggleNewPost = this.toggleNewPost.bind(this);
  }

  toggleNewPost(){
    this.setState(prevState=> ({
      newPost: !prevState.newPost
    }))
    this.forceUpdate();
  }

  render(){
    return(
        <div >
          <Router>
            <Header title={"The best"}/>
            <Route exact path="/" component={NewPostsManager}/>
            <Route exact path="/hot" component={PopularPostsManager}/>
            <Route exact path="/post/:id" component={Post}/>
            <PostModal open={this.state.newPost} onChange={this.toggleNewPost.bind(this)}/>
            <Footer onChange={this.toggleNewPost.bind(this)}/>
          </Router>
            
        </div>
        
    )
  }
}
export default Main;

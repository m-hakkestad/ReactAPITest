import React from 'react';
import './style.scss';
import CardManager from '../CardManager/CardManager';
import Header from '../Header';
import Footer from '../Footer';
import Modal from '../Modal';

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
            <Header/>
            <CardManager/>
            <Modal open={this.state.newPost} onChange={this.toggleNewPost.bind(this)}/>
            <Footer onChange={this.toggleNewPost.bind(this)}/>
        </div>
        
    )
  }
}
export default Main;

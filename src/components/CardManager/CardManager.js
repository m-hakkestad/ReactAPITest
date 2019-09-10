import React from 'react';
import './style.scss';
import SocialCard from '.././SocialCard/SocialCard';

class CardManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      fetched: false
    }
  }

  componentDidMount(){
    fetch('http://10.0.0.187:3004/postids')
    .then(response => response.json())
    .then(inData => this.setState({data: inData, fetched: true}));
  }

createCards(){
  let cards = []
  for(let i = 0; i < this.state.data.length; i++){
    cards.push(<SocialCard key={i} data={this.state.data[i]}/>);
  }
  return cards;
}


  render(){
    if(this.state.fetched){
      return(
        <div className="Cards">
        {this.createCards()}
        </div>
      )
    }else{
      return(
        <div className="Cards">
        Fetching posts
        </div>
      )
    }
  }
}
export default CardManager;

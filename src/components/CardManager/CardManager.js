import React from 'react';
import './style.scss';
import SocialCard from '.././SocialCard/SocialCard';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

class CardManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render(){
    return(
      <Query
      query={gql`
        {
        posts{
          id
          text
          comments
          likes
          retweets
          user {
            name
            username
            profileImg
          }
        }
      }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Good things take time....</p>
        if (error) return <p>Something went wrong...</p>

        return <div className="Card-Column">{data.posts.map(post => <SocialCard className="Cards" post={post} key={post.id}/>)}</div>
      }}
    </Query>
    )
  }
}
export default CardManager;

import React from 'react';
import './style.scss';
import SocialCard from '../SocialCard/SocialCard';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

class PopularPostsManager extends React.Component{
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
        popularPosts{
          id
          text
          score
          date
        }
      }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Good things ta5ke time....</p>
        if (error) return `${error}`

        return <div className="Card-Column">{data.popularPosts.map(post => <SocialCard className="Cards" post={post} key={post.id}/>)}</div>
      }}
    </Query>
    )
  }
}
export default PopularPostsManager;

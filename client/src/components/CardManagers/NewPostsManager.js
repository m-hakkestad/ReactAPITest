import React from 'react';
import './style.scss';
import SocialCard from '../SocialCard/SocialCard';
import {Query, useQuery} from 'react-apollo';
import gql from 'graphql-tag';

const NEW_POSTS = gql`
  query NewPosts{
    newPosts{
    id
    text
    score
    date
    commentids
    comments{
      id
      text
      score
    }
  }
  }
`;

export default function NewPostsManager(){
  const {data, loading, error, refetch} = useQuery(
    NEW_POSTS
  );
  if(loading) return <p>Loading..</p>
  if(error) return <p>Error {error.message}</p>
  refetch()
  return <div className="Card-Column">{data.newPosts.map(post => <SocialCard className="Cards" flow={true} post={post} key={post.id}/>)}</div>
      
}



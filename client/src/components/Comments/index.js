import React from 'react';
import './styles.scss';
import Comment from './Comment'

import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';

const GET_COMMENTS = gql`
  query GetComments($id: String!){
    post(id:$id){
      comments{
        text
        id
        date
      }
    }
  }
`;

export default function Comments({id}){
  const {data, loading, error, refetch} = useQuery(
    GET_COMMENTS,
    {variables: {id}},
    {fetchPolicy: "no-cache"}
  );
  if(loading) return <p>Loading..</p>
  if(error) return <p>Error {error.message}</p>
  refetch()
  return(
    <div className="comments" style={{backgroundColor:"gainsboro"}}>{data.post.comments.map(comment => <Comment data={comment} key={comment.id}/>)}</div>
  )
}
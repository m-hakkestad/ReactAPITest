import React from 'react';
import './styles.scss';
import Comment from './Comment'
import { Card, CardTitle, CardImg, CardSubtitle, CardText, Row, Col } from 'reactstrap';

import {Query, useQuery} from 'react-apollo';
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
  console.log("comments")
  const {data, loading, error, refetch} = useQuery(
    GET_COMMENTS,
    {variables: {id}},
    {fetchPolicy: "no-cache"}
  );
  if(loading) return <p>Loading..</p>
  if(error) return <p>Error {error.message}</p>
  console.log("Return commm")
  console.log(data.post.comments.length)
  refetch()
  return(
    <Card>{data.post.comments.map(comment => <Comment data={comment} key={comment.id}/>)}</Card>
  )
}
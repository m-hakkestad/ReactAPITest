import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input } from 'reactstrap';

import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';


const COMMENT_MUTATION = gql`
  mutation CommentMutation($postid: String!, $text: String!){
    addComment(postid: $postid, text: $text){
        id
        text
        date
    }
  }
`;


class CommentModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: "",
      id: props.id
    }
    this.toggleNewComment = this.toggleNewComment.bind(this);
  }

  toggleNewComment(){
    this.props.onChange();
    this.setState({
      text: ""
    })
    this.forceUpdate();
  }

  render(){
    const text = this.state.text;
      return(
        <Mutation mutation={COMMENT_MUTATION} >
          {CommentMutation => (
              <Modal isOpen={this.props.open} toggle={this.toggleNewComment} className={this.props.className}>
              <ModalHeader toggle={this.toggleNewComment}>Add a new comment to this post</ModalHeader>

              <ModalBody>
                <Form>
                  <FormGroup>
                    <Input type="textarea" name="text" id="exampleText"  onChange={(e) => this.setState({text: e.target.value})}></Input>
                  </FormGroup>
                </Form>
              </ModalBody>
              
              <ModalFooter>
              <Button color="primary" onClick={(e)=>{
                CommentMutation({variables: {postid: this.state.id, text: this.state.text}});
                this.toggleNewComment();
              }}>Post</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewComment}>Cancel</Button>
              </ModalFooter>
          </Modal>
          )}
        </Mutation>
      )
  }
}
export default CommentModal;

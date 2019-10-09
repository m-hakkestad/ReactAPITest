import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input } from 'reactstrap';

import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';


const POST_MUTATION = gql`
  mutation PostMutation($text: String!){
    addPost(text: $text){
        id
        text
        score
        date
    }
  }
`;

const COMMENT_MUTATION = gql`
  mutation CommentMutation($id: String!, $text: String!){
    addPost(id: $id, text: $text){
        id
        text
        date
    }
  }
`;


class myModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: "",
      post: props.post
    }
    this.toggleNewPost = this.toggleNewPost.bind(this);
  }

  toggleNewPost(){
    this.props.onChange();
    this.setState({
      text: ""
    })
  }

  render(){
    const text = this.state.text;

    if(this.state.post){
      return(
        <Mutation mutation={POST_MUTATION} variables={{text}}>
          {PostMutation => (
              <Modal isOpen={this.props.open} toggle={this.toggleNewPost} className={this.props.className}>
              <ModalHeader toggle={this.toggleNewPost}>Add a new post</ModalHeader>

              <ModalBody>
                <Form>
                  <FormGroup>
                    <Input type="textarea" name="text" id="exampleText"  onChange={(e) => this.setState({text: e.target.value})}></Input>
                  </FormGroup>
                </Form>
              </ModalBody>
              
              <ModalFooter>
              <Button href="/" color="primary" onClick={(e)=>{
                PostMutation();
                this.toggleNewPost();
              }}>Post</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewPost}>Cancel</Button>
              </ModalFooter>
          </Modal>
          )}
        </Mutation>
      )
    }else{
      
    }
  }
}
export default myModal;

import React from 'react';
import './styles.scss';
import {FaAngleUp} from 'react-icons/fa';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const SCORE_MUTATION = gql`
  mutation ScoreMutation($modifier: Int!, $id: String!){
    modifyPostScore(modifier: $modifier, id: $id){
        id
        text
        score
        date
    }
  }
`;

class Upvote extends React.Component{
  constructor(props){
    super(props);

    this.update = this.update.bind(this);
    this.state = {
      modifier: 1,
      id: props.id
    }
  }

  update = () => {
    this.props.onChange(this.state.modifier);
  }

  render(){
    const {modifier, id} = this.state;
    return(
      <Mutation mutation={SCORE_MUTATION} variables={{modifier, id}}>
        {ScoreMutation => (
          <FaAngleUp className="socialCard-bottom-row-icon" 
            onClick={(e)=>{
              ScoreMutation();
              this.update();
            }}
          />
        )}
      </Mutation>
    )
  }
}

export default Upvote;
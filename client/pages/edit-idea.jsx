import React from 'react';
import IdeaForm from '../components/idea-form';

export default class EditIdea extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <h1 className="text-center idea-form-title">Edit Idea</h1>
        <IdeaForm ideaToEdit={this.props.ideaToEdit}/>
      </>
    );
  }
}

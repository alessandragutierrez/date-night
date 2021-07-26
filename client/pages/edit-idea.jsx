import React from 'react';
import IdeaForm from '../components/idea-form';

export default class EditIdea extends React.Component {
  constructor(props) {
    super(props);
    this.getUpdatedIdea = this.getUpdatedIdea.bind(this);
  }

  getUpdatedIdea(updatedIdea) {
    this.props.updatedIdea(updatedIdea);
  }

  render() {
    return (
      <>
        <h1 className="text-center idea-form-title">Edit Idea</h1>
        <IdeaForm ideaToEdit={this.props.ideaToEdit} updatedIdea={this.getUpdatedIdea}/>
      </>
    );
  }
}

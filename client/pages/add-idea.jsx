import React from 'react';
import IdeaForm from '../components/idea-form';

export default class AddIdea extends React.Component {
  constructor(props) {
    super(props);
    this.getNewIdea = this.getNewIdea.bind(this);
  }

  getNewIdea(newIdea) {
    this.props.newIdea(newIdea);
  }

  render() {
    return (
      <>
        <h1 className="text-center idea-form-title">Add Idea</h1>
        <IdeaForm newIdea={this.getNewIdea}/>
      </>
    );
  }
}

import React from 'react';
import IdeaForm from '../components/idea-form';

export default class AddIdeaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h1 className="text-center idea-form-title">Add Idea</h1>
        <IdeaForm />
      </>
    );
  }
}

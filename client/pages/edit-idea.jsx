import React from 'react';
import IdeaForm from '../components/idea-form';

export default class EditIdea extends React.Component {

  render() {
    return (
      <>
        <h1 className="text-center idea-form-title">Edit Idea</h1>
        <IdeaForm />
      </>
    );
  }
}

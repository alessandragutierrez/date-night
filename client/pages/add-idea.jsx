import React from 'react';
import IdeaForm from '../components/idea-form';

export default class AddIdeaForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ideas: []
  //   };
  // }

  addIdea(newIdea) {
    fetch('/api/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIdea)
    })
      .then(res => res.json())
      .then(newIdea => {
        // eslint-disable-next-line no-console
        console.log(newIdea);
      });
  }

  render() {
    return (
      <>
        <h1 className="text-center idea-form-title">Add Idea</h1>
        <IdeaForm onSubmit={this.addIdea}/>
      </>
    );
  }
}

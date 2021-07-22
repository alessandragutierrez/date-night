import React from 'react';

export default class IdeaForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  render() {
    return (
      <div className="idea-form-container">
        <form>
          <label className="form-label">
            Title
            <br />
            <input type="text" className="form-input"/>
          </label>
          <br />
          <label className="form-label">
            Location
            <br />
            <input type="text" className="form-input"/>
          </label>
          <br />
          <label className="form-label">
            Description
            <br />
            <textarea type="text" className="form-textarea" rows="5"/>
          </label>
          <div className="row form-buttons-container">
            <button className="form-button cancel-button color-pink">CANCEL</button>
            <button className="form-button submit-button">ADD</button>
          </div>
        </form>
      </div>
    );
  }
}

import React from 'react';

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header-bar-container background-white">
        <div className="row text-center color-pink header-bar">
          <div className="column-quarter margin-auto">
            <span className="fas fa-arrow-left header-icon"></span>
          </div>
          <div className="column-half margin-auto">
            <h1 className="header-title margin-auto font-pacifico">Date Night</h1>
          </div>
          <div className="column-quarter">
            <span className="header-icon"></span>
          </div>
        </div>
      </div>
    );
  }
}

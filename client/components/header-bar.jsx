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
          <div className="header-column-quarter header-column">
            <span className="fas fa-arrow-left header-icon"></span>
          </div>
          <div className="header-column-half header-column">
            <h1 className="header-title font-pacifico">Date Night</h1>
          </div>
          <div className="header-column-quarter header-column">
            <span className="header-icon"></span>
          </div>
        </div>
      </div>
    );
  }
}

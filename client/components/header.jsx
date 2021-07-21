import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row text-center background-white color-pink">
        <div className="column-quarter margin-auto">
          <i className="fas fa-arrow-left header-icon"></i>
        </div>
        <div className="column-half">
          <h1 className="header-title margin-auto">Date Night</h1>
        </div>
        <div className="column-quarter">
          <i className="header-icon"></i>
        </div>
      </div>
    );
  }
}

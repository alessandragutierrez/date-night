import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="nav-bar-container background-white">
        <div className="row text-center color-pink nav-bar">
          <div className="nav-column-third">
            <div className="nav-option-container">
              <span className="fas fa-lightbulb nav-icon"></span>
              <span className="nav-label">Ideas</span>
            </div>
          </div>
          <div className="nav-column-third">
            <div className="nav-option-container">
              <span className="far fa-calendar-check nav-icon"></span>
              <span className="nav-label">Upcoming</span>
            </div>
          </div>
          <div className="nav-column-third">
            <div className="nav-option-container">
              <span className="far fa-heart nav-icon"></span>
              <span className="nav-label">My Dates</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// empty icons
// <div className="far fa-lightbulb"></div>
// <div className="far fa-calendar-check"></div>
// <div className="far fa-heart"></div>

// solid icons
// <div className="fas fa-lightbulb"></div>
// <div className="fas fa-calendar-check"></div>
// <div className="fas fa-heart"></div>

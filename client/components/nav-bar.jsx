import React from 'react';

export default class NavBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  renderIconClasses() {
    return (
      this.props.page === '' ||
      this.props.page === 'add-idea' ||
      this.props.page === 'edit-idea'
        ? {
            ideas: 'fas fa-lightbulb nav-icon',
            upcoming: 'far fa-calendar-check nav-icon',
            myDates: 'far fa-heart nav-icon'
          }
        : this.props.page === 'upcoming'
          ? {
              ideas: 'far fa-lightbulb nav-icon',
              upcoming: 'fas fa-calendar-check nav-icon',
              myDates: 'far fa-heart nav-icon'
            }
          : this.props.page === 'my-dates' ||
            this.props.page === 'view-date-mobile' ||
            this.props.page === 'edit-date'
            ? {
                ideas: 'far fa-lightbulb nav-icon',
                upcoming: 'far fa-calendar-check nav-icon',
                myDates: 'fas fa-heart nav-icon'
              }
            : {
                ideas: 'far fa-lightbulb nav-icon',
                upcoming: 'far fa-calendar-check nav-icon',
                myDates: 'far fa-heart nav-icon'
              }
    );
  }

  render() {
    const iconClasses = this.renderIconClasses();
    return (
      <div className="nav-bar-container background-white">
        <div className="row text-center color-pink nav-bar">
          <div className="nav-column-third">
            <a href="#" className="nav-option-container color-pink no-underline">
              <span className={iconClasses.ideas}></span>
              <span className="nav-label">Ideas</span>
            </a>
          </div>
          <div className="nav-column-third">
            <a href="#upcoming" className="nav-option-container color-pink no-underline">
              <span className={iconClasses.upcoming}></span>
              <span className="nav-label">Upcoming</span>
            </a>
          </div>
          <div className="nav-column-third">
            <a href="#my-dates" className="nav-option-container color-pink no-underline">
              <span className={iconClasses.myDates}></span>
              <span className="nav-label">My Dates</span>
            </a>
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

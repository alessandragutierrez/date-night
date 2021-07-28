import React from 'react';

export default class Upcoming extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  renderUpcomingDates() {
    const upcoming = this.props.upcomingDates;
    return (
      upcoming < 1
        ? <p className="empty-text">You have no upcoming dates.</p>
        : upcoming.map(date =>
          <div key={'schedule' + date.ideaId} className="upcoming-item">
            <div className="date-title color-dark-gray">
              {date.title}
            </div>
            <div className="upcoming-address color-medium-gray">
              <span className="fa fa-map-marker map-marker-icon"></span>
              {date.address}
            </div>
            <div className="date-schedule color-medium-gray">
              <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
              {date.dateAndTimeFormatted}
            </div>
            <div className="date-description color-medium-gray">
              {date.description}
            </div>
            <div className="row desktop-upcoming-buttons">
              <span className="desktop-edit-button-container no-underline">
                <span className="fas fa-edit desktop-edit-icon color-dark-gray"></span>
                <span className="desktop-edit-icon-label color-dark-gray">Edit</span>
              </span>
              <span className="desktop-calendar-button-container">
                <span className="far fa-calendar-times desktop-calendar-icon color-dark-gray"></span>
                <span className="desktop-calendar-icon-label color-dark-gray">Cancel Date</span>
              </span>
            </div>
          </div>
        )
    );
  }

  render() {
    const dateElements = this.renderUpcomingDates();
    return (
      <div className="upcoming-container">
        {dateElements}
      </div>
    );
  }
}

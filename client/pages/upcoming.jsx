import React from 'react';

export default class Upcoming extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  renderUpcomingDates(props) {
    const upcomingDates = this.props.upcomingDates;
    return (
      this.props.upcomingDates < 1
        ? <p className="empty-text">You have no upcoming dates.</p>
        : upcomingDates.map(date =>
          <div key={date.ideaId} className="upcoming-item">
            <div className="date-title color-dark-gray">
              {date.title}
            </div>
            <div className="date-address color-medium-gray">
              <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
              {date.address}
            </div>
            <div className="date-description color-medium-gray">
              {date.description}
            </div>
            <div className="row desktop-upcoming-buttons"></div>
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

import React from 'react';

export default class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingDateOpen: {},
      upcomingDateModalOpen: null
    };
    this.handleUpcomingDateModalBackgroundClick = this.handleUpcomingDateModalBackgroundClick.bind(this);
  }

  handleUpcomingDateClick(date) {
    if (window.innerWidth < 768) {
      this.setState({
        upcomingDateOpen: {
          ideaId: date.ideaId,
          title: date.title,
          description: date.description,
          locationId: date.locationId,
          address: date.address,
          latitude: date.latitude,
          longitude: date.longitude,
          scheduleId: date.scheduleId,
          date: date.date,
          time: date.time,
          dateAndTimeFormatted: date.dateAndTimeFormatted
        },
        upcomingDateModalOpen: true
      });
    }
  }

  handleUpcomingDateModalBackgroundClick(event) {
    if (!event.target.className.includes('background--modal')) {
      return;
    }
    this.setState({
      upcomingDateOpen: {},
      upcomingDateModalOpen: false
    });
  }

  renderUpcomingDates() {
    const upcoming = this.props.upcomingDates;
    return (
      upcoming < 1
        ? <p className="empty-text">You have no upcoming dates.</p>
        : upcoming.map(date =>
          <div key={'upcoming' + date.ideaId} onClick={() => this.handleUpcomingDateClick(date)} className="upcoming-item">
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

  renderUpcomingDateModal() {
    const date = this.state.upcomingDateOpen;
    return (
      date.ideaId === undefined || window.innerWidth > 767 || this.state.upcomingDateModalOpen === false
        ? null
        : <div onClick={this.handleUpcomingDateModalBackgroundClick} className="background--modal">
          <div className="modal border-radius background-white upcoming-box--modal">
            <div className="date-title--modal">
              {date.title}
            </div>
            <div className="date-address--modal color-medium-gray">
              <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
              {date.address}
            </div>
            <div className="date-schedule--modal color-medium-gray">
              <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
              {date.dateAndTimeFormatted}
            </div>
            <div className="date-description--modal color-medium-gray">
              {date.description}
            </div>
            <div className="edit-button-container--modal">
              <a href="#edit-idea" className="edit-button--modal border-radius no-underline text-center">
                <span className="fas fa-edit idea-edit-icon--modal color-dark-gray"></span>
                <span className="idea-edit-label--modal color-dark-gray">Edit</span>
              </a>
            </div>
            <div className="calendar-button-container--modal">
              <a className="calendar-button--modal border-radius no-underline text-center">
                <span className="far fa-calendar-times idea-calendar-icon--modal color-dark-gray"></span>
                <span className="idea-calendar-label--modal color-dark-gray">Cancel Date</span>
              </a>
            </div>
          </div>
        </div>
    );
  }

  render() {
    const upcomingElements = this.renderUpcomingDates();
    const upcomingModal = this.renderUpcomingDateModal();
    return (
      <div className="upcoming-container">
        {upcomingElements}
        {upcomingModal}
      </div>
    );
  }
}

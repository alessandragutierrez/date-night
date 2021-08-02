import React from 'react';

export default class MyDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOpen: {},
      dateModalOpenDesktop: null,
      images: this.props.images
    };
    this.handleDateModalBackgroundClick = this.handleDateModalBackgroundClick.bind(this);
  }

  handleDateClick(date) {
    const dateOpen = {
      ideaId: date.ideaId,
      title: date.title,
      description: date.description,
      note: date.note,
      locationId: date.locationId,
      address: date.address,
      latitude: date.latitude,
      longitude: date.longitude,
      scheduleId: date.scheduleId,
      date: date.date,
      time: date.time,
      dateTimeFormat: date.dateTimeFormat,
      dateTimeYearFormat: date.dateTimeYearFormat,
      dateYearFormat: date.dateYearFormat,
      image: date.image
    };
    if (window.innerWidth > 767) {
      this.setState({
        dateOpen: dateOpen,
        dateModalOpenDesktop: true
      });
    } else if (window.innerWidth < 768) {
      this.props.dateOpen(dateOpen);
      window.location.href = '#view-date-mobile';
    }
  }

  handleDateModalBackgroundClick(event) {
    if (!event.target.className.includes('background--modal')) {
      return;
    }
    this.setState({
      dateOpen: {},
      dateModalOpenDesktop: false
    });
  }

  handleEditButtonClick(date) {
    const targetDate = date;
    this.props.targetDate(targetDate);
  }

  renderImages() {
    const pastDates = this.props.pastDates;
    const images = this.props.images;
    for (let i = 0; i < pastDates.length; i++) {
      for (let j = 0; j < this.props.images.length; j++) {
        if (images[j].scheduleId === pastDates[i].scheduleId) {
          pastDates[i].image = images[j];
        }
      }
    }
    return pastDates;
  }

  renderPastDates() {
    const pastDates = this.renderImages();
    return (
      pastDates < 1
        ? <p className="empty-text">You have no dates to display.</p>
        : pastDates.map(date =>
          date.image
            ? <div key={'past-date' + date.ideaId} onClick={() => this.handleDateClick(date)} className="date-item date-item-with-image" role="dialog">
              <div className="date-content">
                <div className="image-container">
                  <img src={`http://localhost:3000${date.image.url}`} className='image' />
                </div>
                <div className="date-text-container">
                  <div className="date-title color-dark-gray">
                    {date.title}
                  </div>
                  <div className="date-address color-medium-gray">
                    <span className="fa fa-map-marker map-marker-icon"></span>
                    {date.address}
                  </div>
                  <div className="date-schedule color-medium-gray">
                    <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
                    {date.dateYearFormat}
                  </div>
                  <div className="date-description color-medium-gray">
                    {date.description}
                  </div>
                  <div className="date-description color-medium-gray">
                    {date.note}
                  </div>
                </div>
              </div>
            </div>
            : <div key={'past-date' + date.ideaId} onClick={() => this.handleDateClick(date)} className="date-item date-item-without-image" role="dialog">
              <div className="date-title color-dark-gray">
                {date.title}
              </div>
              <div className="date-address color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon"></span>
                {date.address}
              </div>
              <div className="date-schedule color-medium-gray">
                <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
                {date.dateYearFormat}
              </div>
              <div className="date-description color-medium-gray">
                {date.description}
              </div>
              <div className="date-description color-medium-gray">
                {date.note}
              </div>
            </div>
        )
    );
  }

  renderDateModalDesktop() {
    const updatedDate = this.props.updatedDate;
    const targetedDate = this.props.targetedDate;
    let date;
    if (this.state.dateOpen.ideaId !== undefined) {
      date = this.state.dateOpen;
    } else if (updatedDate.ideaId !== undefined) {
      date = updatedDate;
    } else if (targetedDate.ideaId !== undefined) {
      date = targetedDate;
    } else {
      date = {};
    }

    return (
      date.ideaId === undefined || window.innerWidth < 767 || this.state.dateModalOpenDesktop === false
        ? null
        : date.image
          ? <div onClick={this.handleDateModalBackgroundClick} className="background--modal" role="dialog">
              <div className="border-radius background-white date-box--modal">
                <div className="image-container--modal">
                  <img src={`http://localhost:3000${date.image.url}`} className='image--modal' />
                </div>
                <div className="border-radius background-white date-text-container--modal">
                  <div className="date-title--modal">
                    {date.title}
                  </div>
                  <div className="date-address--modal color-medium-gray">
                    <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
                    {date.address}
                  </div>
                  <div className="date-schedule--modal color-medium-gray">
                    <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
                    {date.dateTimeYearFormat}
                  </div>
                  <div className="date-description--modal color-medium-gray">
                    {date.description}
                  </div>
                  <div className="date-description--modal color-medium-gray">
                    {date.note}
                  </div>
                  <div className="edit-button-container--modal">
                    <a href="#edit-date" onClick={() => this.handleEditButtonClick(date)} className="edit-button--modal border-radius no-underline text-center">
                      <span className="fas fa-edit idea-edit-icon--modal color-dark-gray"></span>
                      <span className="idea-edit-label--modal color-dark-gray">Edit</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          : <div onClick={this.handleDateModalBackgroundClick} className="background--modal" role="dialog">
              <div className="border-radius background-white date-box--modal">
                <div className="border-radius background-white date-text-container--modal">
                  <div className="date-title--modal">
                    {date.title}
                  </div>
                  <div className="date-address--modal color-medium-gray">
                    <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
                    {date.address}
                  </div>
                  <div className="date-schedule--modal color-medium-gray">
                    <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
                    {date.dateTimeYearFormat}
                  </div>
                  <div className="date-description--modal color-medium-gray">
                    {date.description}
                  </div>
                  <div className="date-description--modal color-medium-gray">
                    {date.note}
                  </div>
                  <div className="edit-button-container--modal">
                    <a href="#edit-date" onClick={() => this.handleEditButtonClick(date)} className="edit-button--modal border-radius no-underline text-center">
                      <span className="fas fa-edit idea-edit-icon--modal color-dark-gray"></span>
                      <span className="idea-edit-label--modal color-dark-gray">Edit</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

    );
  }

  render() {
    const dateElements = this.renderPastDates();
    const dateModalDesktop = this.renderDateModalDesktop();
    return (
      <div className="past-dates-container">
        {dateElements}
        {dateModalDesktop}
      </div>
    );
  }

}

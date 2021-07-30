import React from 'react';

export default class ViewDateMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleEditButtonClick(date) {
    const targetDate = date;
    this.props.targetDate(targetDate);
  }

  renderDate() {
    const updatedDate = this.props.updatedDate;
    let date;
    if (this.props.dateOpen.ideaId !== undefined) {
      date = this.props.dateOpen;
    } else if (updatedDate.ideaId !== undefined) {
      date = updatedDate;
    }

    return (
      date.ideaId === undefined || window.innerWidth > 767 || this.state.viewDatePageMobile === false
        ? null
        : <div className="view-date-container--mobile">
            <div className="date-item--mobile">
              <div className="date-title color-dark-gray">
                {date.title}
              </div>
              <div className="date-address color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon"></span>
                {date.address}
              </div>
              <div className="date-schedule--mobile color-medium-gray">
                <span className="far fa-calendar-alt scheduled-calendar-icon"></span>
                {date.dateTimeYearFormat}
              </div>
              <div className="date-description--mobile color-medium-gray">
                {date.description}
              </div>
              <div className="edit-button-container--mobile">
                <a href="#edit-date" onClick={() => this.handleEditButtonClick(date)} className="edit-button--mobile border-radius no-underline text-center">
                  <span className="fas fa-edit idea-edit-icon--mobile color-dark-gray"></span>
                  <span className="idea-edit-label--mobile color-dark-gray">Edit</span>
                </a>
              </div>
            </div>
          </div>
    );
  }

  render() {
    const date = this.renderDate();
    return (
      <>
        {date}
      </>
    );
  }
}

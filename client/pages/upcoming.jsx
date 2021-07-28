import React from 'react';

export default class Upcoming extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  renderUpcomingDates(props) {
    const monthsArray = [
      { monthText: 'January', monthNum: '01' },
      { monthText: 'February', monthNum: '02' },
      { monthText: 'March', monthNum: '03' },
      { monthText: 'April', monthNum: '04' },
      { monthText: 'May', monthNum: '05' },
      { monthText: 'June', monthNum: '06' },
      { monthText: 'July', monthNum: '07' },
      { monthText: 'August', monthNum: '08' },
      { monthText: 'September', monthNum: '09' },
      { monthText: 'October', monthNum: '10' },
      { monthText: 'November', monthNum: '11' },
      { monthText: 'December', monthNum: '12' }
    ];
    const upcoming = this.props.upcomingDates;
    for (let i = 0; i < upcoming.length; i++) {
      // const year = upcoming[i].date.substring(0, 4);
      const monthNum = upcoming[i].date.substring(5, 7);
      const matchingMonth = monthsArray.filter(month => {
        return month.monthNum === monthNum;
      });
      const month = matchingMonth[0].monthText;
      const day = upcoming[i].date.substring(8, 10);
      const hourData = upcoming[i].time.substring(0, 2);
      let hourDateToNumber = parseInt(hourData);
      let AMPM = 'AM';
      if (hourDateToNumber > 12) {
        hourDateToNumber = hourDateToNumber - 12;
        AMPM = 'PM';
      }
      const hour = hourDateToNumber.toString();
      const minuteData = upcoming[i].time.substring(3, 5);
      let minute = '';
      if (minuteData.charAt(0) !== '0') {
        minute = `:${minuteData}`;
      }
      const dateAndTimeFormatted = `${month} ${day} at ${hour}${minute} ${AMPM}`;
      upcoming[i].dateAndTimeFormatted = dateAndTimeFormatted;
    }
    return (
      upcoming < 1
        ? <p className="empty-text">You have no upcoming dates.</p>
        : upcoming.map(date =>
          <div key={date.ideaId} className="upcoming-item">
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

import React from 'react';
import HeaderBar from './components/header-bar';
import NavBar from './components/nav-bar';
import Ideas from './pages/ideas';
import AddIdea from './pages/add-idea';
import EditIdea from './pages/edit-idea';
import Upcoming from './pages/upcoming';
import MyDates from './pages/my-dates';
import ViewDateMobile from './pages/view-date-mobile';
import EditDate from './pages/edit-date';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      monthsArray: [
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
      ],
      ideas: [],
      upcomingDates: [],
      pastDates: [],
      targetIdea: {},
      updatedIdea: {},
      dateOpen: {},
      targetDate: {}
    };
    this.addIdea = this.addIdea.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.getTargetIdea = this.getTargetIdea.bind(this);
    this.scheduleIdea = this.scheduleIdea.bind(this);
    this.getDateOpen = this.getDateOpen.bind(this);
    this.getTargetDate = this.getTargetDate.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
      if (route.path === 'add-idea' || route.path === 'upcoming' || route.path === 'my-dates') {
        this.setState({
          targetIdea: {},
          updatedIdea: {}
        });
      }
      if (route.path === '' || route.path === 'upcoming') {
        this.setState({
          dateOpen: {},
          targetDate: {}
        });
      }
    });
    fetch('/api/ideas')
      .then(res => res.json())
      .then(ideas => {
        return fetch('/api/upcoming')
          .then(res => res.json())
          .then(scheduledDates => {
            const datesVerified = this.checkIfPastOrUpcoming(scheduledDates);
            const upcomingDates = datesVerified.upcomingDates;
            const pastDates = datesVerified.pastDates;
            for (let i = 0; i < upcomingDates.length; i++) {
              this.formatDateTimeYear(upcomingDates[i]);
            }
            for (let i = 0; i < pastDates.length; i++) {
              this.formatDateTimeYear(pastDates[i]);
            }
            this.setState({
              ideas: ideas,
              upcomingDates: upcomingDates,
              pastDates: pastDates
            });
          });
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

  addIdea(newIdea) {
    fetch('/api/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIdea)
    })
      .then(res => res.json())
      .then(newIdea => {
        this.setState({
          targetIdea: {},
          updatedIdea: {},
          ideas: this.state.ideas.concat(newIdea)
        });
      })
      .catch(err => {
        console.error('Error:', err);
      });
    window.location.href = '#';
  }

  updateIdea(updatedIdea) {
    fetch(`/api/ideas/${updatedIdea.ideaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedIdea)
    })
      .then(res => res.json())
      .then(updatedIdea => {
        const allIdeas = this.state.ideas.map(originalIdea => {
          return originalIdea.ideaId === updatedIdea.ideaId
            ? updatedIdea
            : originalIdea;
        });
        this.setState({
          updatedIdea: updatedIdea,
          targetIdea: {},
          ideas: allIdeas
        });

      })
      .catch(err => {
        console.error('Error:', err);
      });
    window.location.href = '#';
  }

  deleteIdea(ideaToDelete) {
    fetch(`/api/ideas/${ideaToDelete.locationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        const allIdeas = this.state.ideas.filter(idea => {
          return idea.locationId !== ideaToDelete.locationId;
        });
        this.setState({
          targetIdea: {},
          updatedIdea: {},
          ideas: allIdeas
        });
      })
      .catch(err => {
        console.error('Error:', err);
      });
    window.location.href = '#';
  }

  scheduleIdea(scheduledIdea) {
    fetch('/api/upcoming', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scheduledIdea)
    })
      .then(res => res.json())
      .then(upcomingDate => {
        const allIdeas = this.state.ideas.filter(idea => {
          return idea.ideaId !== scheduledIdea.ideaId;
        });
        const newUpcomingDate = this.formatDateTimeYear(upcomingDate);
        this.setState({
          upcomingDates: this.state.upcomingDates.concat(newUpcomingDate),
          ideas: allIdeas
        });
      })
      .catch(err => {
        console.error('Error:', err);
      });
    window.location.href = '#upcoming';
  }

  updateDate(updatedDate) {
    // console.log(updatedDate);
  }

  formatDateTimeYear(upcoming) {
    const year = upcoming.date.substring(0, 4);
    const monthNum = upcoming.date.substring(5, 7);
    const matchingMonth = this.state.monthsArray.filter(month => {
      return month.monthNum === monthNum;
    });
    const month = matchingMonth[0].monthText;
    const day = upcoming.date.substring(8, 10);
    const hourData = upcoming.time.substring(0, 2);
    let hourDateToNumber = parseInt(hourData);
    let AMPM = 'AM';
    if (hourDateToNumber > 12) {
      hourDateToNumber = hourDateToNumber - 12;
      AMPM = 'PM';
    }
    const hour = hourDateToNumber.toString();
    const minuteData = upcoming.time.substring(3, 5);
    let minute = '';
    if (minuteData.charAt(0) !== '0') {
      minute = `:${minuteData}`;
    }
    const dateTimeFormat = `${month} ${day} at ${hour}${minute} ${AMPM}`;
    const dateTimeYearFormat = `${month} ${day}, ${year} at ${hour}${minute} ${AMPM}`;
    const dateYearFormat = `${month} ${day}, ${year}`;
    upcoming.dateTimeFormat = dateTimeFormat;
    upcoming.dateTimeYearFormat = dateTimeYearFormat;
    upcoming.dateYearFormat = dateYearFormat;
    return upcoming;
  }

  checkIfPastOrUpcoming(date) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const pastDates = [];
    const upcomingDates = [];
    for (let i = 0; i < date.length; i++) {
      const month = parseInt(date[i].date.substring(5, 7));
      const day = parseInt(date[i].date.substring(8, 10));
      const year = parseInt(date[i].date.substring(0, 4));
      const hour = parseInt(date[i].time.substring(0, 2));
      const minutes = parseInt(date[i].time.substring(3, 5));
      if (year > currentYear) {
        upcomingDates.push(date[i]);
      } else if (year === currentYear && month > currentMonth) {
        upcomingDates.push(date[i]);
      } else if (month === currentMonth && day > currentDay) {
        upcomingDates.push(date[i]);
      } else if (day === currentDay && hour > currentHour) {
        upcomingDates.push(date[i]);
      } else if (hour === currentHour && minutes > currentMinutes) {
        upcomingDates.push(date[i]);
      } else {
        pastDates.push(date[i]);
      }
    }
    return ({
      pastDates: pastDates,
      upcomingDates: upcomingDates
    });
  }

  getTargetIdea(targetIdea) {
    this.setState({
      targetIdea: targetIdea,
      updatedIdea: {}
    });
  }

  getTargetDate(targetDate) {
    this.setState({
      targetDate
    });
  }

  getDateOpen(dateOpen) {
    this.setState({ dateOpen });
  }

  renderPage() {
    const { route } = this.state;
    return (
      route.path === ''
        ? <Ideas
            ideas={this.state.ideas}
            targetIdea={this.getTargetIdea}
            targetedIdea={this.state.targetIdea}
            updatedIdea={this.state.updatedIdea}
            monthsArray={this.state.monthsArray}
            scheduledIdea={this.scheduleIdea}/>
        : route.path === 'add-idea'
          ? <AddIdea
              newIdea={this.addIdea}/>
          : route.path === 'edit-idea'
            ? <EditIdea
                ideaToEdit={this.state.targetIdea}
                updatedIdea={this.updateIdea}
                ideaToDelete={this.deleteIdea}/>
            : route.path === 'upcoming'
              ? <Upcoming
                  upcomingDates={this.state.upcomingDates}/>
              : route.path === 'my-dates'
                ? <MyDates
                    pastDates={this.state.pastDates}
                    dateOpen={this.getDateOpen}
                    targetDate={this.getTargetDate}
                    targetedDate={this.state.targetDate} />
                : route.path === 'view-date-mobile'
                  ? <ViewDateMobile
                      dateOpen={this.state.dateOpen}
                      targetDate={this.getTargetDate}
                    />
                  : route.path === 'edit-date'
                    ? <EditDate
                        monthsArray={this.state.monthsArray}
                        dateToEdit={this.state.targetDate}
                        updatedDate={this.updateDate}
                      />
                    : null
    );
  }

  render() {
    const { route } = this.state;
    return (
      <>
        <HeaderBar page={route.path}/>
        <NavBar page={route.path}/>
        <main>
          { this.renderPage() }
        </main>
      </>
    );
  }
}

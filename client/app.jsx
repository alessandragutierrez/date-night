import React from 'react';
import HeaderBar from './components/header-bar';
import NavBar from './components/nav-bar';
import Ideas from './pages/ideas';
import AddIdea from './pages/add-idea';
import EditIdea from './pages/edit-idea';
import Upcoming from './pages/upcoming';
import MyDates from './pages/my-dates';
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
      updatedIdea: {}
    };
    this.addIdea = this.addIdea.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.getTargetIdea = this.getTargetIdea.bind(this);
    this.scheduleIdea = this.scheduleIdea.bind(this);
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
    });
    fetch('/api/ideas')
      .then(res => res.json())
      .then(ideas => {
        return fetch('/api/upcoming')
          .then(res => res.json())
          .then(upcomingDates => {
            for (let i = 0; i < upcomingDates.length; i++) {
              this.formatDateAndTime(upcomingDates[i]);
            }
            return fetch('/api/past-dates')
              .then(res => res.json())
              .then(pastDates => {
                this.setState({
                  ideas: ideas,
                  upcomingDates: upcomingDates,
                  pastDates: pastDates
                });
              });
          });
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
        const newUpcomingDate = this.formatDateAndTime(upcomingDate);
        this.setState({
          upcomingDates: this.state.upcomingDates.concat(newUpcomingDate),
          ideas: allIdeas
        });
      });
    window.location.href = '#upcoming';
  }

  formatDateAndTime(upcoming) {
    // const year = upcoming[i].date.substring(0, 4);
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
    const dateAndTimeFormatted = `${month} ${day} at ${hour}${minute} ${AMPM}`;
    upcoming.dateAndTimeFormatted = dateAndTimeFormatted;
    return upcoming;
  }

  getTargetIdea(targetIdea) {
    this.setState({
      targetIdea: {
        ideaId: targetIdea.ideaId,
        title: targetIdea.title,
        description: targetIdea.description,
        address: targetIdea.address,
        latitude: targetIdea.latitude,
        longitude: targetIdea.longitude,
        locationId: targetIdea.locationId
      },
      updatedIdea: {}
    });
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
                    pastDates={this.state.pastDates}/>
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

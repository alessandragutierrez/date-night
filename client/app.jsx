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
      ideas: [],
      upcomingDates: [],
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
        this.setState({
          ideas: ideas
        });
      });
    fetch('/api/upcoming')
      .then(res => res.json())
      .then(upcomingDates => {
        this.setState({
          upcomingDates: upcomingDates
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
      .then(newUpcomingDate => {
        const allIdeas = this.state.ideas.filter(idea => {
          return idea.ideaId !== scheduledIdea.ideaId;
        });
        this.setState({
          upcomingDates: this.state.upcomingDates.concat(newUpcomingDate),
          ideas: allIdeas
        });
      });
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
                ? <MyDates />
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

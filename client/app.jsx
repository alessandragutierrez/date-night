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
      ideas: []
    };
    this.addIdea = this.addIdea.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    fetch('/api/ideas')
      .then(res => res.json())
      .then(ideas => {
        this.setState({
          ideas: ideas
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
      .then(data => {
        this.setState({
          ideas: this.state.ideas.concat(data)
        });
      });
  }

  renderPage() {
    const { route } = this.state;
    return (
      route.path === ''
        ? <Ideas ideas={this.state.ideas}/>
        : route.path === 'add-idea'
          ? <AddIdea onSubmit={this.addIdea}/>
          : route.path === 'edit-idea'
            ? <EditIdea />
            : route.path === 'upcoming'
              ? <Upcoming />
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

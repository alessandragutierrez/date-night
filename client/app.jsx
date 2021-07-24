import React from 'react';
import HeaderBar from './components/header-bar';
import NavBar from './components/nav-bar';
import Ideas from './pages/ideas';
import Upcoming from './pages/upcoming';
import MyDates from './pages/my-dates';
import AddIdeaForm from './pages/add-idea';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      ideas: []
    };
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

  renderPage() {
    const { route } = this.state;
    return (
      route.path === ''
        ? <Ideas ideas={this.state.ideas}/>
        : route.path === 'add-idea'
          ? <AddIdeaForm />
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

import React from 'react';
import Ideas from './pages/ideas';
import HeaderBar from './components/header-bar';
import NavBar from './components/nav-bar';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Ideas />;
    }
  }

  render() {
    return (
      <>
        <HeaderBar />
        <NavBar />
        <main>
          { this.renderPage() }
        </main>
      </>
    );
  }
}

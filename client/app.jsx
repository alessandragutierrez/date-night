import React from 'react';
import Ideas from './pages/ideas';
import Header from './components/header';
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
      // <>
      // { this.renderPage() }
      // </>
      <Header />
    );
  }
}

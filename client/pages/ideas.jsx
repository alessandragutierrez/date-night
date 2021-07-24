import React from 'react';

export default class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaOpen: {
        ideaId: null,
        title: '',
        address: '',
        description: ''
      }
    };
  }

  handleClick(idea) {
    this.setState({
      ideaOpen: {
        ideaId: idea.ideaId,
        title: idea.title,
        address: idea.address,
        description: idea.description
      }
    });
  }

  renderIdeas(props) {
    const ideas = this.props.ideas;
    return (
      ideas.map(idea =>
        <div key={idea.ideaId} onClick={() => this.handleClick(idea)} className="idea-item">
          <div className="idea-title color-dark-gray">
            {idea.title}
          </div>
          <div className="idea-address color-medium-gray">
            <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
            {idea.address}
          </div>
          <div className="idea-description color-medium-gray">
            {idea.description}
          </div>
          <div className="row desktop-idea-buttons">
            <span className="desktop-edit-button-container">
              <span className="fas fa-edit desktop-idea-edit-icon color-dark-gray"></span>
              <span className="desktop-idea-edit-label color-dark-gray">Edit</span>
            </span>
            <span className="desktop-calendar-button-container">
              <span className="far fa-calendar-plus desktop-idea-calendar-icon color-dark-gray"></span>
              <span className="desktop-idea-calendar-label color-dark-gray">Make It a Date</span>
            </span>
          </div>
        </div>
      )
    );
  }

  renderIdeaModal() {
    const idea = this.state.ideaOpen;
    return (
      idea.ideaId === null || window.innerWidth > 767
        ? null
        : <div className="idea-background--modal">
            <div className="idea-box--modal">
              <div className="idea-title--modal">
                {idea.title}
              </div>
              <div className="idea-address--modal color-medium-gray">
                <span className="fa fa-map-marker map-marker-icon color-medium-gray"></span>
                {idea.address}
              </div>
              <div className="idea-description--modal color-medium-gray">
                {idea.description}
              </div>
              <div className="edit-button-container--modal">
                <button className="edit-button--modal">
                  <span className="fas fa-edit idea-edit-icon--modal color-dark-gray"></span>
                  <span className="idea-edit-label--modal color-dark-gray">Edit</span>
                </button>
              </div>
              <div className="calendar-button-container--modal">
                <button className="calendar-button--modal">
                  <span className="far fa-calendar-plus idea-calendar-icon--modal color-dark-gray"></span>
                  <span className="idea-calendar-label--modal color-dark-gray">Make It a Date</span>
                </button>
              </div>
            </div>
          </div>
    );
  }

  render() {
    const ideaElements = this.renderIdeas();
    const ideaModal = this.renderIdeaModal();
    // window.addEventListener('resize', () => this.render());
    return (
      <div className="ideas-container">
        {ideaElements}
        {ideaModal}
      </div>
    );
  }

}

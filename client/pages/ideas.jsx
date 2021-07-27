import React from 'react';

export default class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaOpen: {},
      ideaModalOpen: null
    };
    this.handleModalBackgroundClick = this.handleModalBackgroundClick.bind(this);
  }

  handleIdeaClick(idea) {
    if (window.innerWidth < 768) {
      this.setState({
        ideaOpen: {
          ideaId: idea.ideaId,
          title: idea.title,
          description: idea.description,
          address: idea.address,
          latitude: idea.latitude,
          longitude: idea.longitude
        },
        ideaModalOpen: true
      });
    }
  }

  handleEditButtonClick(idea) {
    const targetIdea = idea;
    this.props.targetIdea(targetIdea);
  }

  handleModalBackgroundClick(event) {
    if (!event.target.className.includes('background--modal')) {
      return;
    }
    this.setState({
      ideaOpen: {},
      ideaModalOpen: false
    });
  }

  renderIdeas(props) {
    const ideas = this.props.ideas;
    return (
      ideas.map(idea =>
        <div key={idea.ideaId} onClick={() => this.handleIdeaClick(idea)} className="idea-item">
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
            <a href="#edit-idea" onClick={() => this.handleEditButtonClick(idea)} className="desktop-edit-button-container no-underline">
              <span className="fas fa-edit desktop-idea-edit-icon color-dark-gray"></span>
              <span className="desktop-idea-edit-label color-dark-gray">Edit</span>
            </a>
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
    const updatedIdea = this.props.updatedIdea;
    const targetedIdea = this.props.targetedIdea;
    let idea;
    if (this.state.ideaOpen.ideaId !== undefined) {
      idea = this.state.ideaOpen;
    } else if (updatedIdea.ideaId !== undefined) {
      idea = updatedIdea;
    } else if (targetedIdea.ideaId !== undefined) {
      idea = targetedIdea;
    } else {
      idea = {};
    }
    return (
      idea.ideaId === undefined || window.innerWidth > 767 || this.state.ideaModalOpen === false
        ? null
        : <div onClick={this.handleModalBackgroundClick} className="background--modal">
            <div className="modal border-radius idea-box--modal background-white">
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
              <a href="#edit-idea" onClick={() => this.handleEditButtonClick(idea)} className="edit-button--modal border-radius no-underline text-center">
                  <span className="fas fa-edit idea-edit-icon--modal color-dark-gray"></span>
                  <span className="idea-edit-label--modal color-dark-gray">Edit</span>
                </a>
              </div>
              <div className="calendar-button-container--modal">
                <a className="calendar-button--modal border-radius no-underline text-center">
                  <span className="far fa-calendar-plus idea-calendar-icon--modal color-dark-gray"></span>
                  <span className="idea-calendar-label--modal color-dark-gray">Make It a Date</span>
                </a>
              </div>
            </div>
          </div>
    );
  }

  render() {
    const ideaElements = this.renderIdeas();
    const ideaModal = this.renderIdeaModal();
    return (
      <div className="ideas-container">
        {ideaElements}
        {ideaModal}
      </div>
    );
  }
}

import React from 'react';

function Idea(props) {
  const { title, description, address } = props.idea;
  // const idAttr = `idea-item-${ideaId}`;
  return (
    <div className="idea-item">
      <div className="idea-title color-dark-gray">
        {title}
      </div>
      <div className="idea-address color-medium-gray">
        <span className="fa fa-map-marker map-marker-icon color-medium-gray" aria-hidden="true"></span>
        {address}
      </div>
      <div className="idea-description color-medium-gray">
        {description}
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
  );
}

function Ideas(props) {
  return (
    <div className="ideas-container">
    {
      props.ideas.map(idea => {
        return (
          <Idea
            key={idea.ideaId}
            idea={idea}
          />
        );
      })
    }
    </div>
  );
}

export default Ideas;

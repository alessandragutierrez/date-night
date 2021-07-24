import React from 'react';

function Idea(props) {
  const { title, description, address } = props.idea;
  // const idAttr = `idea-item-${ideaId}`;
  return (
    <div>
      {title}
      {address}
      {description}
    </div>
  );
}

function Ideas(props) {
  return (
    <>
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
    </>
  );
}

export default Ideas;

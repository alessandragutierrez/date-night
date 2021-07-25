import React from 'react';

export default class HeaderBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  renderIconClasses() {
    return (
      this.props.page === ''
        ? {
            icon1: '',
            icon2: 'fas fa-plus header-icon'
          }
        : this.props.page === 'add-idea' || this.props.page === 'edit-idea'
          ? {
              icon1: 'fas fa-arrow-left header-icon',
              icon2: ''
            }
          : {
              icon1: 'header-icon',
              icon2: 'header-icon'
            }
    );
  }

  render() {
    const iconClasses = this.renderIconClasses();
    return (
      <div className="header-bar-container background-white">
        <div className="row text-center header-bar">
          <div className="header-column-quarter header-column">
            <a onClick={() => history.back()} className="color-pink">
              <span className={iconClasses.icon1}></span>
            </a>
          </div>
          <div className="header-column-half header-column">
            <h1 className="header-title font-pacifico color-pink">Date Night</h1>
          </div>
          <div className="header-column-quarter header-column">
            <a href="#add-idea" className="color-pink">
              <span className={iconClasses.icon2}></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

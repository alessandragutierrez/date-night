import React from 'react';

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleIcon1Click = this.handleIcon1Click.bind(this);
  }

  renderIconClasses() {
    return (
      this.props.page === ''
        ? {
            icon1: '',
            icon2: 'fas fa-plus header-icon'
          }
        : this.props.page === 'add-idea' || this.props.page === 'edit-idea' || this.props.page === 'view-date-mobile'
          ? {
              icon1: 'fas fa-arrow-left back-arrow header-icon',
              icon2: ''
            }
          : this.props.page === 'my-dates'
            ? {
                icon1: '',
                // feature in progress
                // icon1: 'fas fa-map-marked-alt header-map-icon',
                icon2: ''
              }
            : {
                icon1: 'header-icon',
                icon2: 'header-icon'
              }
    );
  }

  handleIcon1Click(event) {
    if (event.target.className.includes('back-arrow')) {
      return (
        history.back()
      );
    } else if (event.target.className.includes('header-map-icon')) {
      return (
        null
      );
    }
  }

  render() {
    const iconClasses = this.renderIconClasses();
    return (
      <div className="header-bar-container background-white">
        <div className="row text-center header-bar">
          <div className="header-column-quarter header-column">
            <a onClick={this.handleIcon1Click} className="color-pink">
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

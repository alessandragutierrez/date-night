import React from 'react';
import DateForm from '../components/date-form';

export default class EditDate extends React.Component {

  render() {
    return (
      <>
        <h1 className="text-center date-form-title">Edit Date</h1>
        <DateForm monthsArray={this.props.monthsArray}/>
      </>
    );
  }
}

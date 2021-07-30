import React from 'react';
import DateForm from '../components/date-form';

export default class EditDate extends React.Component {
  constructor(props) {
    super(props);
    this.getUpdatedDate = this.getUpdatedDate.bind(this);
    this.getDateImgs = this.getDateImgs.bind(this);
  }

  getUpdatedDate(updatedDate) {
    this.props.updatedDate(updatedDate);
  }

  getDateImgs(dateImgs) {
    this.props.dateImgs(dateImgs);
  }

  render() {
    return (
      <>
        <h1 className="text-center date-form-title">Edit Date</h1>
        <DateForm
          monthsArray={this.props.monthsArray}
          dateToEdit={this.props.dateToEdit}
          updatedDate={this.getUpdatedDate}
          dateImgs={this.getDateImgs} />
      </>
    );
  }
}

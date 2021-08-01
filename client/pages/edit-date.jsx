import React from 'react';
import DateForm from '../components/date-form';

export default class EditDate extends React.Component {
  constructor(props) {
    super(props);
    this.getUpdatedDate = this.getUpdatedDate.bind(this);
    this.getFormData = this.getFormData.bind(this);
  }

  getUpdatedDate(updatedDate) {
    this.props.updatedDate(updatedDate);
  }

  getFormData(formData) {
    this.props.formData(formData);
  }

  render() {
    return (
      <>
        <h1 className="text-center date-form-title">Edit Date</h1>
        <DateForm
          monthsArray={this.props.monthsArray}
          dateToEdit={this.props.dateToEdit}
          updatedDate={this.getUpdatedDate}
          formData={this.getFormData} />
      </>
    );
  }
}

import React from 'react'
import { Button } from 'reactstrap'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import get from 'lodash/get'

import { addItem, updateItem } from 'redux/actions/Item'
import NewField from 'components/Input'

// get current date
const now = new Date()
const month = now.getMonth() + 1
const nowDateString = `${now.getFullYear()}-${month.toString().padStart(2, '0')}-${now
  .getDate()
  .toString()
  .padStart(2, '0')}`

class AddItem extends React.Component {
  onSubmit = event => {
    const { dispatch, initialValues, history } = this.props
    const { id = '', done = false } = initialValues
    const { name = '', createdDate = '' } = event
    let currentDate = new Date()
    if (id) {
      dispatch(updateItem({ id, createdDate, name, done }))
    } else {
      let id = currentDate.getTime()
      dispatch(addItem({ id, createdDate, name, done }))
    }
    history.push('/home')
  }
  handleCancel = () => {
    this.props.history.push('/home')
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props

    return (
      <div className="AddItem Card_container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="AddItem_body">
            <Field
              label="Task Name"
              type="text"
              name="name"
              id="name"
              placeholder="Enter task name"
              component={NewField}
            />

            <div className="AddItem_date">
              <Field
                label="Create Date"
                type="date"
                id="createdDate"
                name="createdDate"
                placeholder="Date"
                component={NewField}
              />
            </div>
          </div>

          <hr className="marginPadding" />
          <div className="footer_btn">
            <Button outline color="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={invalid || submitting || pristine}>
              Create
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

// validate input redux form
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.date) {
    errors.date = 'Required'
  }
  return errors
}

AddItem = reduxForm({
  form: 'AddSpech',
  enableReinitialize: true,
  validate
})(AddItem)
const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: { createdDate: nowDateString, ...get(ownProps, 'location.state', {}) }
  }
}
export default connect(mapStateToProps)(AddItem)

import React from 'react'
import DateTime from 'react-datetime'
import { Form } from 'react-bootstrap'

export default ({
  input,
  label,
  placeholder,
  dateFormat,
  timeFormat,
  type,
  meta: { touched, error, warning },
  ...otherProps
}) => (
  <Form.Group color={touched && error ? 'danger' : ''}>
    <Form.Label>
      {label}
    </Form.Label>
    <DateTime {...input} inputProps={{ placeholder }}
      dateFormat={dateFormat} timeFormat={timeFormat} {...otherProps} />
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </Form.Group>
)

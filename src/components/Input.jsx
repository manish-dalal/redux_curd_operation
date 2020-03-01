import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

// input component
const NewField = ({ input, type, placeholder, id, label }) => {
  return (
    <FormGroup>
      {label ? <Label for={label}>{label}</Label> : void 0}
      <Input {...input} type={type} id={id} placeholder={placeholder} />
    </FormGroup>
  )
}
export default NewField

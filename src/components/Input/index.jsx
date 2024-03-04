import React from 'react';
import { Form } from 'react-bootstrap';
import { useController } from 'react-hook-form';

function Input({control, type, name, value, onChange, onBlur}) {
  const {
    field
  } = useController({
    name,
    control,
    value , 
    onChange,
    onBlur,
    rules: {       
      required: true,
      minLength: {
        value: 8,
        message: "Password must be at least 8 letters!"
      }
     },
  });
  // console.log({field})

  return (
    <Form.Group style = {{marginBottom: '3vh'}}>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        type={type}
      />
    </Form.Group>

  );
}

export default Input;

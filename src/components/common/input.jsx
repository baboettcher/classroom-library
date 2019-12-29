import React from 'react';

const Input = (props) => {
  const { name, label, onChange, value, error } = props
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type="text"
        className="form-control" />
      {error[name] && <div className="alert alert-danger">{error[name]}</div>}
    </div>
  )
}

export default Input;
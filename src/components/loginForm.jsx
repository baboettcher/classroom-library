import React, { Component } from 'react';
import Input from "./common/input"
import Joi from "joi-browser"

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  }

  validate = () => {
    const options = {
      abortEarly: false
    }
    // second arg is schema, 3rd is options
    const { error } = Joi.validate(this.state.account, this.schema, options)

    if (!error) return null
    const errors = {}
    for (let item of error.details) {
      errors[item.path[0]] = item.message
    }
    return errors
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema)
    return error ? error.details[0].message : null

  }

  handleSubmit = e => {
    e.preventDefault()
    // clear error before each submit
    const errors = this.validate()
    this.setState({
      errors: errors || {}
    })

    if (errors) return
    // call server
  }


  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name];

    const account = { ...this.state.account }
    account[input.name] = input.value;
    this.setState({ account, errors })
  }

  render() {
    const { errors } = this.state

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name={"username"}
            label={"Username"}
            value={this.state.account.username}
            onChange={this.handleChange}
            error={errors} />
          <Input
            name={"password"}
            label={"Password"}
            value={this.state.account.password}
            onChange={this.handleChange}
            error={errors} />
          <button className="btn btn-primary" disabled={this.validate()}>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;


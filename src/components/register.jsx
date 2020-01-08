import React from 'react';
import Form from "./common/form"
import Joi from "joi-browser"


class RegisterForm extends Form {
  state = {
    data: {
      username: "", password: "", name: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .email(),
    // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .required()
      .label("Password")
      .min(5),
    name: Joi.string()
      .required()
      .label("Name")
  }

  doSubmit = () => {
    // call server
    console.log("submitted")
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;


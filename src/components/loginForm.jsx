import React, { Component } from 'react';
import Form from "./common/form"
import Joi from "joi-browser"

// TUESDAY: - REGISTER COMPONENT
// Username must be a valid email
// Password muts be a minimum of 5 characters
// 

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  }

  doSubmit = () => {
    // call server
    console.log("submitted")
  }

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;


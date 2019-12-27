import React, { Component } from 'react';
import Input from "./common/input"

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    // call server
    console.log("submitted", this.state.account)
  }

  // handleChange = e => {
  //   const account = { ...this.state.account }
  //   account[e.currentTarget.name] = e.currentTarget.value;
  //   this.setState({ account })
  // }

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account }
    account[input.name] = input.value;
    this.setState({ account })
  }

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input name={"username"} label={"Username"} value={this.state.account.username} onChange={this.handleChange} />
          <Input name={"password"} label={"Password"} value={this.state.account.password} onChange={this.handleChange} />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;


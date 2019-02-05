import React, { Component } from "react";
import { postData } from "../../api/api";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginUser, populateFavorites } from '../../actions';

export class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      status: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitForm = async event => {
    const { name, email, password, passwordCheck } = this.state;
    event.preventDefault();
    try {
      if (password === passwordCheck) {
        var response = await postData("/new", { name, email, password });
        let currentUser = await postData('', { email, password })
        currentUser = {
          id: currentUser.data.id,
          name: currentUser.data.name,
          favorites: []
        }
        this.props.loginUser(currentUser)
        this.setState({ status: response.status })
      }
    } catch {
        this.setState({ status: "error"})
    }
  };

  render() {
    const { name, email, password, passwordCheck, status } = this.state;
    return (
      <form onSubmit={this.submitForm} className="createUser-form">
        <h2>Create Account</h2>
        <input
          onChange={this.handleChange}
          name="name"
          value={name}
          placeholder="name"
        />
        <input
          onChange={this.handleChange}
          name="email"
          value={email}
          placeholder="email"
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          value={password}
          placeholder="password"
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="passwordCheck"
          value={passwordCheck}
          placeholder="confirm password"
        />
        {password !== passwordCheck && <p>Passwords do not match</p>}
        {status === "error" && <p>Email is taken</p>}
        {status === "success" && <Redirect to="/" />}
        <button>SUBMIT</button>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
  populateFavorites: (favorites) => dispatch(populateFavorites(favorites))
})

export default connect(null, mapDispatchToProps)(CreateUser)
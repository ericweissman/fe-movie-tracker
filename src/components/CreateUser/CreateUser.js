import React, { Component } from "react";
import { postData } from "../../api/api";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginUser, populateFavorites } from '../../actions';

class CreateUser extends Component {
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
        const currentUser = await postData('', { email, password })
        this.props.loginUser(currentUser.data)
        this.setState({ status: response.status })
        // this.props.loginUser()
      }
    } catch {
        this.setState({ status: "error"})
    }
  };

  render() {
    const { name, email, password, passwordCheck, status } = this.state;
    return (
      <form onSubmit={this.submitForm}>
        <h2>Create account</h2>
        <input onChange={this.handleChange} name="name" value={name} placeholder='name'/>
        <input onChange={this.handleChange} name="email" value={email} placeholder='email'/>
        <input onChange={this.handleChange} type='password' name="password" value={password} placeholder='password'/>
        <input onChange={this.handleChange} type='password' name="passwordCheck" value={passwordCheck} placeholder='confirm password'/>
        {password !== passwordCheck && <p>Passwords do not match</p> }
        {status === 'error' && <p>Email is taken</p>}
        {status === 'success' && <Redirect to='/' />}
        <button>SUBMIT</button>
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
  populateFavorites: (favorites) => dispatch(populateFavorites(favorites))
})

export default connect(null, mapDispatchToProps)(CreateUser)
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <h2>Login</h2>
        <input onChange={this.handleChange} name='username' value={this.state.username} placeholder='username'></input>
        <input onChange={this.handleChange} name='password' value={this.state.password} placeholder='password'></input>
        <button>Login</button>
        <a href=''>Sign Up</a>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (user) => dispatch(loginUser(user))
})

export default connect(null, mapDispatchToProps)(Login)
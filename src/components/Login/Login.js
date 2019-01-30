import React, {Component} from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions';
import { fetchUser } from '../../api/api'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  submitForm = async (event) => {
    event.preventDefault();
    const currentUser = await fetchUser(this.state)
    this.props.handleSubmit(currentUser.data)
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <h2>Login</h2>
        <input onChange={this.handleChange} name='email' value={this.state.email} placeholder='email'></input>
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
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions';
import { postData } from '../../api/api'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: ''
    }
  }
  
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  submitForm = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      const currentUser = await postData('', { email, password })
      this.props.handleSubmit(currentUser.data)
    } catch {
      this.setState({ status: 'error' })
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <h2>Login</h2>
        <input onChange={this.handleChange} name='email' value={this.state.email} placeholder='email'></input>
        <input onChange={this.handleChange} name='password' type='password' value={this.state.password} placeholder='password'></input>
        <button>Login</button>
        {this.state.status === 'error' && <p>Email and password do not match</p> }
        <a href=''>Sign Up</a>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (user) => dispatch(loginUser(user))
})

export default connect(null, mapDispatchToProps)(Login)
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { loginUser, populateFavorites } from '../../actions';
import { fetchData, postData } from '../../api/api'
import { Redirect, Link } from 'react-router-dom';

export class Login extends Component {
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

  getFavorites = async (id) => {
    const url = `http://localhost:3000/api/users/${id}/favorites`
    let userFavorites = await fetchData(url)
    userFavorites = userFavorites.data.map(favorite => {
      return favorite.movie_id
    })
    console.log(userFavorites)
    this.props.populateFavorites(userFavorites)
  }


  handleSubmit = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      const currentUser = await postData('', { email, password })
      this.props.loginUser(currentUser.data)
      console.log(currentUser)
      this.getFavorites(currentUser.data.id)
      this.setState({ status: currentUser.status })
    } catch {
      this.setState({ status: 'error' })
    }
  }

  render() {

    const { email, password, status } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <input onChange={this.handleChange} name='email' value={email} placeholder='email'></input>
        <input onChange={this.handleChange} name='password' type='password' value={password} placeholder='password'></input>
        <button>Login</button>
        {status === 'error' && <p>Email and password do not match</p> }
        {status === 'success' && <Redirect to='/' /> }
        <Link to='/signup'>Sign Up</Link>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
  populateFavorites: (favorites) => dispatch(populateFavorites(favorites))

})

export default connect(null, mapDispatchToProps)(Login)
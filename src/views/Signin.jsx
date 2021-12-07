import React from 'react'
import axios from 'axios'

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
  }

  constructor(props) {
    super(props)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  /** @param {React.ChangeEvent<HTMLInputElement>} event */
  onChangeInput(event) {
    const { value, id } = event.target

    this.setState({ [id]: value })
  }

  onSubmit() {
    try {
      const { data } = axios.post('http://localhost:9000/api/signin', {
        email: this.state.email,
        password: this.state.password,
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <h1 className="text-center">Signin</h1>
        <div className="w-50 mx-auto">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.onChangeInput} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChangeInput} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
        </div>
      </>
    )
  }
}

export default Signin
// @ts-check

import React from 'react'
import authorizationAPI from '../apis/authorization'
import utils from '../apis/utils'
import store from '../store'

/**
 * @typedef {object} SigninResponse
 * @property {'success' | 'error'} status
 * @property {string} msg
 * @property {string} token
 * @property {UserData} user
 */

/**
 * @typedef {object} UserData
 * @property {number} id
 * @property {string} email
 * @property {string} name
 * @property {boolean} isAdmin
 */

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
    isProcessing: false,
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
    if (store.isAuth) return alert('用戶已登入')

    if (this.state.isProcessing) return void 0
    this.setState({ isProcessing: true }, () => {
      this.submit()
    })
  }

  async submit() {
    try {
      const { email, password } = this.state
      if (!email || !password) return alert('表單皆為必填')

      /** @type {{ data: SigninResponse }} */
      const { data } = await authorizationAPI.signin({
        email: this.state.email,
        password: this.state.password,
      })
      if (data.status !== 'success') return alert('Unknown Server Error')

      // 儲存 JWT
      window.localStorage.setItem('token', data.token)
      store.setCurrentUser(data.user, data.token)
      store.showState()
      alert('成功登入')
    } catch (err) {
      alert('登入失敗，帳號或密碼錯誤')
      utils.handleError(err)
    } finally {
      this.setState({ isProcessing: false })
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
            <div id="emailHelp" className="form-text">test admin: admin@example.com</div>
            <div id="emailHelp" className="form-text">test user: user@example.com</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChangeInput} />
            <div id="emailHelp" className="form-text">test pw: 123456</div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary" onClick={this.onSubmit} disabled={this.state.isProcessing}>Submit</button>
          </div>
        </div>
      </>
    )
  }
}

export default Signin
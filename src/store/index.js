// fake 狀態管理

class AppState {
  static #state = {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      isAdmin: false,
    },
    token: '',
    isAuth: false,
  }

  static get isAuth() {
    return this.#state.isAuth
  }

  static showState() {
    console.log(this.#state)
  }

  /**
   * @typedef {object} UserData
   * @property {number} id
   * @property {string} email
   * @property {string} name
   * @property {boolean} isAdmin
   */

  /**
   * @param {UserData} user 
   * @param {string} token 
   */
  static setCurrentUser(user, token) {
    this.#state.currentUser = {
      ...this.#state.currentUser,
      ...user,
    }
    this.#state.token = token
    this.#state.isAuth = true
  }
}

// for dev
window['AppState'] = AppState

export default AppState

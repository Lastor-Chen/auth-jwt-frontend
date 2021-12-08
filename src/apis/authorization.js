import axiosHelper from './_config'

const authorization = {
  /**
   * @param {{ email: string, password: string }} body 
   */
  signin(body) {
    return axiosHelper.post('/signin', {
      email: body.email,
      password: body.password,
    })
  },
}

export default authorization
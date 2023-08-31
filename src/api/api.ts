import registerHandler from './handlers/registerHandler'
import logoutHandler from './handlers/logoutHandler'
import students from './handlers/students'

const api = {
  register: registerHandler,
  logout: logoutHandler,
  students
}

export default api

import registerHandler from './handlers/registerHandler'
import logoutHandler from './handlers/logoutHandler'
import students from './handlers/students'
import creatures from './handlers/creatures'

const api = {
  register: registerHandler,
  logout: logoutHandler,
  students,
  creatures
}

export default api

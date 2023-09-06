import registerHandler from './handlers/registerHandler'
import logoutHandler from './handlers/logoutHandler'
import students from './handlers/students'
import creatures from './handlers/creatures'
import library from './handlers/library'
import loginHandler from './handlers/loginHandler'

const api = {
  login: loginHandler,
  register: registerHandler,
  logout: logoutHandler,
  students,
  creatures,
  library
}

export default api

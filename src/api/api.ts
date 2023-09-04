import registerHandler from './handlers/registerHandler'
import logoutHandler from './handlers/logoutHandler'
import students from './handlers/students'
import creatures from './handlers/creatures'
import tasks from './handlers/tasks'

const api = {
  register: registerHandler,
  logout: logoutHandler,
  students,
  creatures,
  tasks
}

export default api

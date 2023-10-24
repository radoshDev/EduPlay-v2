import type { TaskCategory, TaskSubcategory, Task } from './db'

export type Library = {
  category: TaskCategory
  subcategory: TaskSubcategory
  task: Task
}

import type { Creature, Task } from './db'

export type TaskRound = {
  index: number
  earned: number
  roundTasks: Task[]
  creature: Creature
}

export type TaskStudentProgress = Partial<
  Record<string, Record<string, TaskRound>>
>

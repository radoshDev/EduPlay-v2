export type Progress = {
  date: string
  value: number
}

export type StudentsProgress = {
  label: string
  progress: Progress[]
  backgroundColor: string
}

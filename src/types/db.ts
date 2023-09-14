export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type Tables = Database['public']['Tables']

export type Student = Tables['students']['Row']
export type StudentProgress = Tables['students_progress']['Row']
export type StudentWithProgress = Student & { progress: StudentProgress[] }
export type Creature = Tables['creatures']['Row']
export type CreatureCategory = Tables['creature_categories']['Row']
export type CategoryWithCreatures = CreatureCategory & { creatures: Creature[] }
export type TaskCategory = Tables['task_categories']['Row']
export type TaskCategoryInsert = Tables['task_categories']['Insert']
export type TaskCategoryUpdate = Tables['task_categories']['Update']
export type TaskCategoryTree = TaskCategory & {
  subcategories: TaskSubcategory[]
}
export type TaskSubcategory = Tables['task_subcategories']['Row']
export type TaskSubcategoryInsert = Tables['task_subcategories']['Insert']
export type TaskSubcategoryUpdate = Tables['task_subcategories']['Update']
export type Task = Tables['tasks']['Row']
export type TaskInsert = Tables['tasks']['Insert']
export type TaskUpdate = Tables['tasks']['Update']
export type TaskWithDifficulty = Task & {
  subcategory: Pick<TaskSubcategory, 'difficulty'> | null
}

export type Values = {
  category: {
    add: { input: TaskCategoryInsert; output: TaskCategory }
    update: { input: TaskCategoryUpdate; output: TaskCategory }
    delete: { input: string; output: void }
    getAll: { input: void; output: TaskCategoryTree[] }
  }
  subcategory: {
    add: { input: TaskSubcategoryInsert; output: TaskSubcategory }
    update: { input: TaskSubcategoryUpdate; output: TaskSubcategory }
    delete: { input: string; output: void }
    getAll: { input: void; output: TaskSubcategory[] }
  }
  task: {
    add: { input: TaskInsert; output: Task }
    update: { input: TaskUpdate; output: Task }
    delete: { input: string; output: void }
    getAll: { input: void; output: TaskWithDifficulty[] }
  }
}

export interface Database {
  public: {
    Tables: {
      creature_categories: {
        Row: {
          description: string | null
          imageUrl: string | null
          slug: string
          sourceLink: string | null
          title: string
        }
        Insert: {
          description?: string
          imageUrl?: string
          slug?: string
          sourceLink?: string
          title: string
        }
        Update: {
          description?: string
          imageUrl?: string
          slug?: string
          sourceLink?: string
          title?: string
        }
        Relationships: []
      }
      creatures: {
        Row: {
          categorySlug: string
          description: string | null
          mainImage: string
          media: string[]
          slug: string
          source: string | null
          title: string
        }
        Insert: {
          categorySlug: string
          description?: string
          mainImage?: string
          media?: string[]
          slug: string
          source?: string
          title: string
        }
        Update: {
          categorySlug?: string
          description?: string
          mainImage?: string
          media?: string[]
          slug: string
          source?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'creatures_categorySlug_fkey'
            columns: ['categorySlug']
            referencedRelation: 'creature_categories'
            referencedColumns: ['slug']
          }
        ]
      }
      students: {
        Row: {
          avatar: string
          difficulty: number
          id: string
          name: string
          roundLength: number
          userId: string
        }
        Insert: {
          avatar: string
          difficulty: number
          id?: string
          name: string
          roundLength: number
          userId: string
        }
        Update: {
          avatar?: string
          difficulty?: number
          id: string
          name?: string
          roundLength?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'students_userId_fkey'
            columns: ['userId']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      students_progress: {
        Row: {
          date: string
          id: number
          student_id: string
          value: number
        }
        Insert: {
          date: string
          id?: number
          student_id: string
          value: number
        }
        Update: {
          date?: string
          id?: number
          student_id?: string
          value?: number
        }
        Relationships: []
      }
      task_categories: {
        Row: {
          imageUrl: string | null
          position: number
          slug: string
          title: string
        }
        Insert: {
          imageUrl?: string
          position?: number
          slug?: string
          title: string
        }
        Update: {
          imageUrl?: string
          position?: number
          slug: string
          title?: string
        }
        Relationships: []
      }
      task_subcategories: {
        Row: {
          difficulty: number
          imageUrl: string | null
          parentSlug: string
          position: number
          slug: string
          title: string
        }
        Insert: {
          difficulty?: number
          imageUrl?: string
          parentSlug: string
          position?: number
          slug?: string
          title?: string
        }
        Update: {
          difficulty?: number
          imageUrl?: string
          parentSlug?: string
          position?: number
          slug: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'task_subcategories_parentSlug_fkey'
            columns: ['parentSlug']
            referencedRelation: 'task_categories'
            referencedColumns: ['slug']
          }
        ]
      }
      tasks: {
        Row: {
          id: string
          result: string | null
          subcategorySlug: string
          type: string
          value: string
        }
        Insert: {
          id?: string
          result?: string
          subcategorySlug: string
          type: string
          value: string
        }
        Update: {
          id: string
          result?: string
          subcategorySlug?: string
          type?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tasks_subcategorySlug_fkey'
            columns: ['subcategorySlug']
            referencedRelation: 'task_subcategories'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'tasks_type_fkey'
            columns: ['type']
            referencedRelation: 'task_categories'
            referencedColumns: ['slug']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: 'user' | 'admin'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

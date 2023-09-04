export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Student = Database['public']['Tables']['students']['Row']
export type StudentProgress =
  Database['public']['Tables']['students_progress']['Row']
export type StudentWithProgress = Student & { progress: StudentProgress[] }
export type Creature = Database['public']['Tables']['creatures']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']

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
          description?: string | null
          imageUrl?: string | null
          slug?: string
          sourceLink?: string | null
          title: string
        }
        Update: {
          description?: string | null
          imageUrl?: string | null
          slug?: string
          sourceLink?: string | null
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
          description?: string | null
          mainImage?: string | null
          media?: string[]
          slug?: string
          source?: string | null
          title: string
        }
        Update: {
          categorySlug?: string
          description?: string | null
          mainImage?: string | null
          media?: string[]
          slug?: string
          source?: string | null
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
          position: number | null
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
          slug?: string
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
          slug?: string
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
          subcategorySlug?: string
          type: string
          value?: string
        }
        Update: {
          id?: string
          result?: string | null
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

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

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
          mainImage: string | null
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
          difficulty: number | null
          id: string
          name: string
          ruoudLength: number | null
          userId: string | null
        }
        Insert: {
          avatar?: string
          difficulty?: number | null
          id?: string
          name?: string
          ruoudLength?: number | null
          userId?: string | null
        }
        Update: {
          avatar?: string
          difficulty?: number | null
          id?: string
          name?: string
          ruoudLength?: number | null
          userId?: string | null
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
          studentid: string
          value: number
        }
        Insert: {
          date: string
          id?: number
          studentid: string
          value: number
        }
        Update: {
          date?: string
          id?: number
          studentid?: string
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
          imageUrl?: string | null
          position?: number | null
          slug?: string
          title: string
        }
        Update: {
          imageUrl?: string | null
          position?: number | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      task_subcategories: {
        Row: {
          difficulty: number | null
          imageUrl: string | null
          parentSlug: string
          position: number | null
          slug: string
          title: string
        }
        Insert: {
          difficulty?: number | null
          imageUrl?: string | null
          parentSlug: string
          position?: number | null
          slug?: string
          title?: string
        }
        Update: {
          difficulty?: number | null
          imageUrl?: string | null
          parentSlug?: string
          position?: number | null
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
          parentSlug: string | null
          result: string | null
          value: string
        }
        Insert: {
          id?: string
          parentSlug?: string | null
          result?: string | null
          value?: string
        }
        Update: {
          id?: string
          parentSlug?: string | null
          result?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tasks_parentSlug_fkey'
            columns: ['parentSlug']
            referencedRelation: 'task_subcategories'
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

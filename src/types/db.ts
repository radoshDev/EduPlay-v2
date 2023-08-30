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
          title: string | null
        }
        Insert: {
          title: string | null
          description?: string | null
          imageUrl?: string | null
          slug?: string
          sourceLink?: string | null
        }
        Update: {
          description?: string | null
          imageUrl?: string | null
          slug?: string
          sourceLink?: string | null
          title?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

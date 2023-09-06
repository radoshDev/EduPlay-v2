export type AnchorTarget = '_self' | '_blank' | '_parent' | '_top'

export type ValueOf<T extends Object> = T[keyof T]

export type QueryData<T> = {
  data: T
  isLoading: boolean
  error: string
}

export type Category = {
  title: string
  slug: string
  imageUrl: string | null
}

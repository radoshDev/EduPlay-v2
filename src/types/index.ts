export type AnchorTarget = '_self' | '_blank' | '_parent' | '_top'

export type ValueOf<T extends Object> = T[keyof T]

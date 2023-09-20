export type Size = 'lg' | 'md' | 'sm' | 'xs'

export type Color = 'blue' | 'green' | 'red' | 'yellow'
export type Variant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'

export type IconNames =
  | 'bi-github'
  | 'bi-box-arrow-in-left'
  | 'bi-github'
  | 'bi-gear-fill'
  | 'bi-image-fill'
  | 'bi-plus-circle-fill'
  | 'bi-cash-coin'
  | 'md-arrowbackios-outlined'
  | 'md-arrowforwardios-outlined'
  | 'md-deleteforever-round'
  | 'md-morevert'
  | 'md-removecircle'
  | 'fa-regular-edit'
  | 'fa-wikipedia-w'
  | 'fa-question-circle'
  | 'fc-calculator'
  | 'fc-reading-ebook'
  | 'hi-solid-arrow-narrow-left'
  | 'hi-solid-arrow-narrow-right'
  | 'hi-switch-horizontal'
  | 'io-close-circle-sharp'
  | 'io-library-sharp'
  | 'io-link-sharp'
  | 'io-reload-sharp'
  | 'io-reload-circle'
  | 'io-rocket-sharp'
type Animation =
  | 'wrench'
  | 'ring'
  | 'pulse'
  | 'spin'
  | 'spin-pulse'
  | 'flash'
  | 'float'
type Flip = 'vertical' | 'horizontal' | 'both'

export type IconProps = {
  name: IconNames
  scale?: number | string
  animation?: Animation
  speed?: 'slow' | 'fast'
  hover?: boolean
  flip?: Flip
  fill?: string
  label?: string
  title?: string
  inverse?: boolean
}

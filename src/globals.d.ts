import type { ModalKeys } from './types'

type WindowWithModals = {
  [K in ModalKeys]: HTMLDialogElement
}

declare global {
  interface Window extends WindowWithModals {}
}

export {}

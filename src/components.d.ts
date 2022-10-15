// components.d.ts

import { DefineComponent } from 'vue'
import { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

declare module 'vue' {
  export interface GlobalComponents {
    FontAwesomeIcon: DefineComponent<Partial<FontAwesomeIconProps>>
  }
}

export {}

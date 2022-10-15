type Option = {
  [key: string]: any
  disabled?: boolean
}

export type ListItem = Option | string

export type OptionCallback = (value: ListItem) => string

export type Options = Array<ListItem>

export type OptionsValues = Array<string>

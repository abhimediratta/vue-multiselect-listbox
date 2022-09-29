type Option = {
  [key: string]: any;
  disabled: boolean;
};

export type ListItem = Option | string;

export type ItemCallback = (value: ListItem) => string;
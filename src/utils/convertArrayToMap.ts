import { ItemCallback } from "components/main";

export function getValue(item, valueProperty? : ItemCallback) {
  return valueProperty(item);
}

export default function convertArrayToMap(items, valueProperty) {
  return items.reduce((result, item) => {
    const value = getValue(item, valueProperty);
    result[value] = true;
    return result;
  }, {});
}
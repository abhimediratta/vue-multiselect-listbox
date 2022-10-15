import { ListItem } from 'components/main'

export default function convertArrayToMap(
  items: Array<ListItem>,
  valueProperty
) {
  return items.reduce((result, item) => {
    const value = valueProperty(item)
    result[value] = true
    return result
  }, {})
}

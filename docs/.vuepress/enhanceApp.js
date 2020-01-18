import pageComponents from '@internal/page-components'
import MultiSelect from '../../src/components/MultiSelect/MultiSelect';

export default ({Vue, options, router, siteData}) => {
  Vue.component('v-multi-select-listbox', MultiSelect);
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
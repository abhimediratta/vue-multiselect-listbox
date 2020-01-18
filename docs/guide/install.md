## NPM / Yarn
Install with NPM:
```bash
npm install vue-multiselect-listbox

# or, using Yarn
yarn add vue-multiselect-listbox
```

Then, import and register the component:

```js
import Vue from 'vue'
import vMultiselectListbox from 'vue-multiselect-listbox'

Vue.component('v-multiselect-listbox', vMultiselectListbox)
```

The component doesn't itself contain any CSS, you'll need to include it yourself:

```js
import 'vue-multiselect-listbox/dist/vue-multi-select-listbox.css';
```

Alternatively, you can import the scss for complete control of the component styles:

```scss
@import "vue-multiselect-listbox/src/scss/vue-multi-select-listbox.scss";
```
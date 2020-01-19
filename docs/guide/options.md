## Options

`vue-multiselect-listbox` accepts arrays, it could be an array of primitives or an array of objects

```html
<!-- array of strings or numbers -->
<v-multiselect-listbox :options="['Alabama', 'California']"></v-multiselect-listbox>
```

<v-multiselect-listbox :options="['Alabama', 'California']"></v-multiselect-listbox>

```html
<!-- or, an array of objects -->
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code">
</v-multiselect-listbox>
```


<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code"></v-multiselect-listbox>

<!-- ## Options labels -->


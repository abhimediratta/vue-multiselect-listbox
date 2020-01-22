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


<v-multiselect-listbox style="margin-bottom: 40px;" :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code"></v-multiselect-listbox>



## Select/Deselect All options buttons

You can hide the select/deselect all options buttons, by default they're shown.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       :show-select-all-buttons="false">
</v-multiselect-listbox>
```

<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code" :show-select-all-buttons="false"></v-multiselect-listbox>




## List Options

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



## Select/Deselect All Buttons

You can hide the select/deselect all options buttons, by default they're shown.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       :show-select-all-buttons="false">
</v-multiselect-listbox>
```

<v-multiselect-listbox style="margin-bottom: 40px;" :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code" :show-select-all-buttons="false"></v-multiselect-listbox>

## Highlight Difference from the original input

You enable highlighting different options removed or added from the original copy. The boolean flag is `highlight-diff`.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       search-input-class="custom-input-class"
                       highlight-diff>
</v-multiselect-listbox>
```

You can also pass CSS classes for highlighting added or removed items. These classes are `highlightAddedClass` and `highlightRemovedClass`.

<HighlightDiffExample />


## Search Input Placeholder

You can customize the placeholders in the search inputs.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       search-options-placeholder="Search states"
                       selected-options-placeholder="Search selected states">
</v-multiselect-listbox>
```

<v-multiselect-listbox style="margin-bottom: 40px;" :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code" search-options-placeholder="Search states" selected-options-placeholder="Search selected states"></v-multiselect-listbox> 


## Empty Listbox Placeholder

You can customize the placeholders in the list boxes when they're empty.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       no-options-text="No states"
                       selected-no-options-text="No states selected">
</v-multiselect-listbox>
```

<v-multiselect-listbox style="margin-bottom: 40px;" :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code" no-options-text="No options" selected-no-options-text="No options selected"></v-multiselect-listbox> 

## Empty Search Placeholder

You can customize the placeholders when options are found while searching.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       no-options-found-text="No state found"
                       no-selected-options-found-text="No selected state found">
</v-multiselect-listbox>
```

<v-multiselect-listbox style="margin-bottom: 40px;" :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code" no-options-found-text="No state found" no-selected-options-found-text="No selected state found"></v-multiselect-listbox> 


## Hide Search Input

You can hide the search input using the following option `hide-search-inputs`:

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       no-options-found-text="No state found"
                       no-selected-options-found-text="No selected state found"
                       hide-search-inputs>
</v-multiselect-listbox>
```

<v-multiselect-listbox style="margin-bottom: 40px;" :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]" :reduce-display-property="(option) => option.label" :reduce-value-property="(option) => option.code" no-options-found-text="No state found" no-selected-options-found-text="No selected state found" hide-search-inputs></v-multiselect-listbox> 


## Style Search Input

You can pass a class to style the input boxes. The property to pass the class is `search-input-class`.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       search-input-class="custom-input-class">
</v-multiselect-listbox>
```
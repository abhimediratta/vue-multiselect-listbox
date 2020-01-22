## Styling Search Input boxes

You can pass a class to style the input boxes. The property to pass the class is `search-input-class`.

```html
<v-multiselect-listbox :options="[{label: 'Alabama', code: 'al'}, {label: 'California', code: 'cal'}]"
                       :reduce-display-property="(option) => option.label"
                       :reduce-value-property="(option) => option.code"
                       search-input-class="custom-input-class">
</v-multiselect-listbox>
```

## SCSS Variables

SCSS variables are used in most of the component styles. You can check the complete styling in `src/scss`. The variables listed below can be found at
[`src/scss/_variables`](https://github.com/abhimediratta/vue-multiselect-listbox/blob/master/src/scss/_variables.scss).

<<< @/../src/scss/_variables.scss


All variables are implemented with `!default` in order to make them easier to override in your application.


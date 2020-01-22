## Value Selection

### `v-model`

You'll be able to get values from `v-model` in the parent component. The value selected will always be an array. This is the convention most developers use.

```html
<v-multiselect-listbox v-model="selectedStates"></v-multiselect-listbox>
```

### Props and Events

#### Prop: `value`

The property `value` can also be used along with the handling the event `input` or the event `change`. You'll have to update the bound variable when using the `value` property.


```html
<v-multiselect-listbox :value="selectedStates"></v-multiselect-listbox>
```

#### Event: `input`

The `input` event is triggered whenever the values are changed. It sends the selected values array as the parameter.

#### Event: `change`

The `change` event is also triggered whenever the values are changed. It sends the selected values array as the parameter. 

> **Note:**
You're free to use either of the above events (`input` or `change`) since both are for a similar purpose. The `change` is added for a more declarative syntax since it clearly indicates that you're handling an event which is called when the value has changed.
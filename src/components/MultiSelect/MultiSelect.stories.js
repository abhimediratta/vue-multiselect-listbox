import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, object, text } from '@storybook/addon-knobs';

import MultiSelect from './MultiSelect';


const methods = {
  change: action('change')
};

const stories = storiesOf('Components | Form / Input / Multi Select', module);

stories.addDecorator(withKnobs);

stories
  .add('default', () => ({
    components: { MultiSelect },
    template: `<MultiSelect v-model="value" :list-items="listItems" @change="change" />`,
    props: {
      listItems: {
        default: array('List Items', ['Chicago', 'Wisconsin', 'Houston'])
      },
    },
    data: () => ({
      value: []
    }),
    methods
  }))
  .add('Empty list', () => ({
    components: { MultiSelect },
    template: `<MultiSelect v-model="value" :list-items="listItems" @change="change" />`,
    props: {
      listItems: {
        default: array('List Items', [])
      },
    },
    data: () => ({
      value: []
    }),
    methods
  }))
  .add('List with objects', () => ({
    components: { MultiSelect },
    template: `<MultiSelect v-model="value" 
                :list-items="listItems"
                :display-property="displayProperty"
                :value-property="valueProperty"
                @change="change" />`,
    props: {
      listItems: {
        default: object('List Items', [{
          name: 'Chicago',
          id: 'ch'
        },
        {
          name: 'Houston',
          id: 'ho'
        }])
      },
      displayProperty: {
        default: text('Display property', 'name')
      },
      valueProperty: {
        default: text('Value property', 'id')
      }
    },
    data: () => ({
      value: []
    }),
    methods
  }));

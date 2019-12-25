import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, object, text } from '@storybook/addon-knobs';

import SearchableList from './SearchableList';


const methods = {
  onClickOption: action('onClickOption')
};

const stories = storiesOf('Components | Searchable List', module);

stories.addDecorator(withKnobs);

stories
  .add('default', () => ({
    components: { SearchableList },
    template: `<SearchableList :list-items="listItems" @selectOption="selectOption" />`,
    props: {
      listItems: {
        default: array('List Items', ['Chicago', 'Wisconsin', 'Houston'])
      }
    },
    data: () => ({
      
    }),
    methods
  }))
  .add('Empty list', () => ({
    components: { SearchableList },
    template: `<SearchableList :list-items="listItems" @selectOption="selectOption" />`,
    props: {
      listItems: {
        default: array('List Items', [])
      }
    },
    data: () => ({
      
    }),
    methods
  }))
  .add('List with objects', () => ({
    components: { SearchableList },
    template: `<SearchableList 
                @onClickOption="onClickOption" 
                :list-items="listItems" 
                :display-property="displayProperty"
                :value-property="valueProperty" 
                :placeholder-text="placeholderText" />`,
    props: {
      listItems: {
        default: object('List Items', [
          {
            name: 'Chicago',
            id: 'ch'
          },
          {
            name: 'Houston',
            id: 'ho'
          }
        ])
      },
      placeholderText: {
        default: text('Search Placeholder', 'Search State'),
      },
      displayProperty: {
        default: text('Display property', 'name')
      },
      valueProperty: {
        default: text('Value property', 'id')
      }
    },
    data: () => ({
      
    }),
    methods
  }));

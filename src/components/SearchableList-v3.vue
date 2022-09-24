<script setup lang="ts">
import { ListItem } from './main';

interface Props {
  listItems: Array<ListItem>;
  selectedListItems: Array<ListItem>;
  highlightItems: Array<ListItem>;
  placeholderText: string;
}
</script>

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  isOpen: false,

  items: Ember.A(),

  itemLabelPath: "name",
  itemValuePath: "name",

  verticalOffset: -16,

  actions: {
    toggleDropdown() {
      this.set('isOpen', !this.get('isOpen'));
    },

    handleSelect(item) {
      let selectedItem = this.get('items')[item.get('index')];
      if (selectedItem) {
        this.set('label', Ember.get(selectedItem, this.get('itemLabelPath')));
      }
      this.set('isOpen', false);
    },
  }
});

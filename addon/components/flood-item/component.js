import Ember from 'ember';
import layout from './template';
import Registerable from '../../mixins/registerable';

export default Ember.Component.extend(Registerable, {
  layout: layout,

  tagName: 'flood-item',

  attributeBindings: [
    'tabIndex:tabindex',
    'disabled:aria-disabled',
    'disabled:disabled',
    'role',
  ],

  role: 'listitem',

  // disabled: false,

  tabIndex: Ember.computed('disabled', function() {
    return this.get('disabled') ? '-1' : '0';
  }),

  label: null,

  classNameBindings: ['isSelected:is-selected', 'disabled'],

  isSelected: Ember.computed('parentComponent.selectedIndex', function() {
    let selectedItem = this.get('parentComponent.selectedItem');
    if (selectedItem) {
      return selectedItem.get('elementId') === this.get('elementId');
    }else{
      return false;
    }
  }),

  focusIn(event) {
    var parent = this.get('parentComponent');
    parent.focusItem(this);
    event.preventDefault();
  },

  click() {
    if (this.get('disabled')) { return; }

    let action = this.attrs.action;
    var parent = this.get('parentComponent');

    if (Ember.isPresent(action)) {
      action();
    }else{
      parent.selectItem(this);
      // this.sendAction('action');
    }

  }
});

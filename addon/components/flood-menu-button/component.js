import Ember from 'ember';
import layout from './template';

import ControlState from '../../mixins/control-state';

export default Ember.Component.extend(ControlState, {
  tagName: 'flood-menu-button',
  layout: layout,
  target: null,
  verticalAlign: 'top',
  horizontalAlign: 'left',
  disabled: false,
  isOpen: false,
  placeholder: null,
  label: "Menu",

  role: 'group',
  ariaHasPopup: true,

  attributeBindings: [
    'role',
    'ariaHasPopup:aria-haspopup'
  ],

  triggerElement: null,

  didInsertElement() {
    this.set('triggerElement', this.$('.dropdown-trigger')[0]);
    this._super(...arguments);
  },

  close() {
    this.set('isOpen', false);
  },

  focusOut() {
    Ember.run.next(this, function(){
      if (this.$().has(document.activeElement).length === 0) {
        this.close();
      }
    });
  },
});

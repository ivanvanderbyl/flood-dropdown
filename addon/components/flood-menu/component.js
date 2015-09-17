import Ember from 'ember';
import layout from './template';
// import MenuBehaviour from "../../mixins/menu-behaviour";
import Selectable from "../../mixins/selectable";
import Focussable from "../../mixins/focussable";
import KeyBindings from "../../mixins/key-bindings";
import Registry from "../../mixins/registry";

// const {service} = Ember.inject;
export default Ember.Component.extend(Registry, Focussable, Selectable, KeyBindings, {
  layout: layout,

  tagName: 'flood-menu',

  disabled: false,

  attributeBindings: [
    'tabIndex:tabindex',
    'role',
  ],

  role: 'menu',
  tabIndex: Ember.computed('disabled', function() {
    return this.get('disabled') ? '-1' : '0';
  }),

  isMenuContainer: true,

  keyBindings: {
    'down': 'focusNext',
    'up': 'focusPrevious',
    'enter': 'activateFocussed',
    'space': 'activateFocussed',
  },

  selectedItemChanged: Ember.observer('selectedIndex', function() {
    let index = this.get('selectedIndex');
    this.sendAction('select', this.get('registeredComponents').objectAt(index));
  }),

  selectItem(item) {
    if (item.get('disabled')) { return; }
    this.focusItem(item);
    this.selectItemAt(this.get('registeredComponents').indexOf(item));
  },

  focusItem(item) {
    if (item.get('disabled')) { return; }
    this.focusItemAt(this.get('registeredComponents').indexOf(item));
  },

});

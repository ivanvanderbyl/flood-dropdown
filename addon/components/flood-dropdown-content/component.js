import Ember from 'ember';
import layout from './template';
import StyleBinding from '../../mixins/style-binding';

export default Ember.Component.extend(StyleBinding, {
  layout: layout,
  tagName: 'flood-dropdown-content',

  styles: {},

  attributeBindings: [
    'tabIndex:tabindex',
  ],

  tabIndex: 0,
});

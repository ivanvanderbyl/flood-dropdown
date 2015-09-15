import Ember from 'ember';
import layout from './template';

const {service} = Ember.inject;
export default Ember.Component.extend({
  layout: layout,
  tagName: 'flood-dropdown',

  dropdown: service(),

  label: "Select Country",

  isOpen: Ember.computed.readOnly('dropdown.isOpen'),

  attributeBindings: [
    'tabIndex:tabindex',
    'role',
  ],

  role: 'menu',

  disabled: false,

  _positionRect: {},

  didInsertElement() {
    this.calculatePositionRect();
  },

  isOpenChanged: Ember.observer('isOpen', function() {
    const isOpen = this.get('isOpen');

    if (isOpen) {
      Ember.run.schedule('afterRender', this, this._focusContent);
    }
  }),

  // styleBindings: [
  //   'position:fixed',
  //   // '_horizontalAlignTargetValue:left',
  //   // 'width[px]', 'color', 'fontSize:font-size[em]', 'margin[px]',
  //   // 'show:display?block:none', 'visible:visibility?:hidden'
  // ],

  // styleBindings: Ember.computed('horizontalAlign', 'verticalAlign', 'hasElement', {
  //   get: function() {
  //     let bindings = ['position: fixed'];
  //     if (this.get('hasElement')) {
  //       let horizontalAlign = this.get('horizontalAlign');
  //       let _horizontalAlignTargetValue = this.get('_horizontalAlignTargetValue');
  //       console.log(horizontalAlign);

  //       bindings.addObject(`${horizontalAlign}:${_horizontalAlignTargetValue}`);
  //     }

  //     return bindings;
  //   }
  // }),

  /**
   * The orientation against which to align the dropdown content
   * horizontally relative to the dropdown trigger.
   */
  horizontalAlign: 'left',

  /**
   * The orientation against which to align the dropdown content
   * vertically relative to the dropdown trigger.
   */
  verticalAlign: 'top',

  horizontalOffset: 0,

  verticalOffset: 0,

  positionTarget: Ember.computed('element', function() {
    if (this.element) {
      return this.element.querySelector('button[trigger]');
    }
  }),

  actions: {
    toggleDropdown() {
      this.get('dropdown').toggle();
    }
  },

  containedElement: Ember.computed('isOpen', 'element', '_state', {
    get: function() {
      if (!this.element) { return null; }
      let content = this.element.querySelector('flood-dropdown-content');
      if (content) {
        return content.childNodes[0];
      }else{
        return null;
      }
    }
  }),

  calculatePositionRect() {
    this.set('_positionRect', this.get('positionTarget').getBoundingClientRect());
  },

  _horizontalAlignTargetValue: Ember.computed('horizontalAlign', 'horizontalOffset', '_positionRect', {
    get: function() {
      let target;
      if (this.get('horizontalAlign') === 'right') {
        target = document.documentElement.clientWidth - this.get('_positionRect').right;
      } else {
        target = this.get('_positionRect').left;
      }
      target += this.get('horizontalOffset');
      return Math.max(target, 0);
    }
  }),

  /**
   * The vertical offset value used to position the dropdown.
   */
  _verticalAlignTargetValue: Ember.computed('verticalOffset', 'verticalAlign', '_positionRect', {
    get: function() {
      let target;
      if (this.get('verticalAlign') === 'bottom') {
        target = document.documentElement.clientHeight - this.get('_positionRect').bottom;
      } else {
        target = this.get('_positionRect').top;
      }
      target += this.get('verticalOffset');
      return Math.max(target, 0);
    }
  }),

  focusOut() {
    // console.log(this.$(), document.activeElement);
    if (this.$().has(document.activeElement).length === 0) {
      // this.get('dropdown').close();
    }
  },

  _focusContent() {
    // this._focusElement(this.get('containedElement'));
  },

  _focusElement(element) {
    if (!element) { return; }
    if (element.focus) {
      element.focus();
    }else{
      element.parentElement.focus();
    }
  }
});

import Ember from 'ember';
import layout from './template';

import ScrollLockManager from '../../mixins/scroll-lock-manager';
import StyleBinding from '../../mixins/style-binding';

export default Ember.Component.extend(ScrollLockManager, StyleBinding, {
  layout: layout,
  tagName: 'flood-dropdown',

  label: "Select Country",

  attributeBindings: [
    'tabIndex:tabindex',
    'role',
  ],

  role: 'menu',

  disabled: false,

  isOpen: false,

  _positionRect: {},

  styles: {},

  didInsertElement() {
    this._super(...arguments);
    this.calculatePositionRect();
  },

  isOpenChanged: Ember.observer('isOpen', function() {
    const isOpen = this.get('isOpen');

    if (isOpen) {
      Ember.run.schedule('afterRender', this, this._focusContent);
      Ember.run.schedule('afterRender', this, this._updateOverlayPosition);

      // this.lockElementForScrolling(this.get('elementId'));
    }else{
      // Ember.run.schedule('afterRender', this, this.unlockElementForScrolling, this.get('elementId'));
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
    return this.element;
  }),

  actions: {
    toggleDropdown() {
      this.toggle();
    }
  },

  close(){
    this.set('isOpen', false);
  },

  open() {
    this.set('isOpen', true);
  },

  toggle() {
    if(this.get('isOpen')) {
      this.close();
    }else{
      this.open();
    }
  },

  containedElement: Ember.computed('isOpen', 'element', '_state', {
    get() {
      if (!this.element) { return null; }
      let content = this.element.querySelector('flood-dropdown-content');
      if (content) {
        return content.children[0];
      }else{
        return null;
      }
    }
  }),

  calculatePositionRect() {
    const positionTarget = this.get('positionTarget');
    if (Ember.isPresent(positionTarget)) {
      this.set('_positionRect', this.get('positionTarget').getBoundingClientRect());
    }
  },

  positionTargetChanged: Ember.observer('positionTarget', function() {
    this.calculatePositionRect();
  }),

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

  _updateOverlayPosition() {
    this._positionRectMemo = null;

    let styles = this.getWithDefault('styles', {});

    styles[this.get('horizontalAlign')] =
      this.get('_horizontalAlignTargetValue') + 'px';

    styles[this.get('verticalAlign')] =
      this.get('_verticalAlignTargetValue') + 'px';

    // NOTE(cdata): We re-memoize inline styles here, otherwise
    // calling `refit` from `IronFitBehavior` will reset inline styles
    // to whatever they were when the dropdown first opened.
    // if (this._fitInfo) {
    //   this._fitInfo.inlineStyle[this.horizontalAlign] =
    //     styles[this.horizontalAlign];

    //   this._fitInfo.inlineStyle[this.verticalAlign] =
    //     styles[this.verticalAlign];
    // }
    this.set('styles', styles);
    this.propertyDidChange('styles');
  },

  // focusIn() {
  //   console.log(document.activeElement);
  // },

  // focusOut() {
  //   // console.log(this.$());
  //   if (this.$().has(document.activeElement).length === 0) {

  //     // this.get('dropdown').close();
  //   }
  // },

  _focusContent() {
    // console.log(this.get('containedElement'));
    this._focusElement(this.get('containedElement'));
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

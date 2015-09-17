import Ember from 'ember';

export default Ember.Mixin.create({
  oldTabIndex: null,
  tabIndex: 0,
  disabled: null,
  hasFocus: false,

  attributeBindings: [
    'tabIndex:tabindex',
    'disabledAttrValue:disabled',
    'ariaDisabled:aria-disabled'
  ],

  classNameBindings: [
    'hasFocus:has-focus',
    'disabled',
  ],

  ariaDisabled: Ember.computed.alias('disabledAttrValue'),

  disabledAttrValue: Ember.computed('disabled', {
    get(){
      let disabled = this.get('disabled');
      if (!!disabled) {
        return "true";
      }else{
        return undefined;
      }
    }
  }),

  disabledChanged: Ember.observer('disabled', function() {
    let disabled = !!this.get('disabled');
    if (disabled) {
      this.set('oldTabIndex', this.get('tabIndex'));
      this.set('tabIndex', -1);
      this.element.blur();
    }else{
      this.set('tabIndex', this.get('oldTabIndex'));
    }
  }),

  gainedFocus: Ember.on('focusIn', function() { this.set('hasFocus', true); }),
  lostFocus: Ember.on('focusOut', function() { this.set('hasFocus', false); }),
});

import Ember from 'ember';

/**
 * Provides aria compliant behaviours for interacting with a menu like component.
 *
 * @type {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Returns the currently focused item
   *
   * @type {String}
   */
  focusedIndex: null,

  registerItem(item) {
    this.get('items').addObject(item);
  },

  deregisterItem(item) {
    this.get('items').removeObject(item);
  },

  attributeBindings: [
    'role',
    'disabled:aria-disabled',
    'disabled:disabled',
    'ariaMultiselectable:aria-multiselectable',
    'ariaSelected:aria-selected'
  ],

  role: 'menu',

  ariaMultiselectable: false,
  ariaSelected: false,

  keyBindings: {
    'down': 'handleDown',
    'up': 'handleUp',
    'esc': 'reset',
    'enter': 'handleEnter'
  },

  focusedItemDidChange: Ember.observer('focusedItem', function() {
    Ember.run.schedule('afterRender', this, function() {
      let focusedItem = this.get('focusedItem');
      if (focusedItem) { focusedItem.element.focus(); }
    });
  }),

  focusIn() {
    this.element.blur();

    this.set('focusedItem', null);

    Ember.run.schedule('afterRender', this, function() {
      const selectedItem = this.get('selectedItem');

      if (selectedItem) {
        this.set('focusedItem', selectedItem);
      }else{
        this.set('focusedItem', this.get('items').objectAt(0));
      }
    });
  },

  reset() {
    // esc blurs the control
    if (this.get('focusedItem')) {
      this.get('focusedItem').element.blur();
    }
  },

  handleEnter() {
    this.selectItemAt(this.get('focusedIndex'));
  },

  handleDown() {
    this.selectNext();
  },

  handleUp() {
    this.selectPrevious();
  }
});

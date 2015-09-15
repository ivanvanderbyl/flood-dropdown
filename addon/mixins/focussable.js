import Ember from 'ember';

export default Ember.Mixin.create({
  /**
   * Returns the currently focused item
   *
   * @type {String}
   */
  focusedIndex: null,

  selectedIndex: Ember.required(),

  focusItemAt(index) {
    this.set('focusedIndex', index);
  },

  focusedItemDidChange: Ember.observer('focusedIndex', function() {
    let focusedItem = this.get('registeredComponents').objectAt(this.get('focusedIndex'));
    this.set('focusedItem', focusedItem);
    if (focusedItem) { focusedItem.element.focus(); }
  }),

  focusNext() {
    let focusedIndex = this.get('focusedIndex'),
        length = this.get('registeredComponents.length'),
        index = (focusedIndex + 1) % length;
    this.focusItemAt(index);
  },

  focusPrevious() {
    let focusedIndex = this.get('focusedIndex'),
        length = this.get('registeredComponents.length'),
        index = (focusedIndex - 1 + length) % length;
    this.focusItemAt(index);
  },

  activateFocussed() {
    Ember.run.schedule('afterRender', this, function() {
      if (!!this.get('focusedItem.disabled')) { return; }
      this.set('selectedIndex', this.get('focusedIndex'));
      this.propertyDidChange('selectedIndex');
      this.propertyDidChange('focusedIndex');
    });
  },

  focusIn(event) {
    // Menu container should never get focus. Instead we focus the best item.
    if (event.target === this.element) {
      this.element.blur();

      this.set('focusedIndex', null);

      Ember.run.schedule('afterRender', this, function() {
        const selectedIndex = this.get('selectedIndex');

        if (this.get('focusedIndex') === null && selectedIndex) {
          this.set('focusedIndex', selectedIndex);
        }else{
          this.set('focusedIndex', 0);
        }
      });
    }
  },
});

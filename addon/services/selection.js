import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * All the currently selected items
   *
   * @type {Array}
   */
  selection: Ember.A(),

  /**
   * Support multiple selection
   *
   * @type {Boolean}
   */
  multi: false,

  selectedItem: function() {
    return this.get('multi') ? this.get('selection') : this.get('selection.firstObject');
  }.property('selection.[]'),

  /**
   * Indicates if a given item is selected.
   *
   * @method isSelected
   * @param {*} item The item whose selection state should be checked.
   * @returns Returns true if `item` is selected.
   */
  isSelected(item) {
    return this.get('selection').contains(item);
  },

  /**
   * Sets the selection state for a given item to either selected or deselected.
   *
   * @method setItemSelected
   * @param {*} item The item to select.
   * @param {boolean} isSelected True for selected, false for deselected.
   */
  setItemSelected(item, isSelected = true) {
    if (Ember.isPresent(item)) {
      if (isSelected) {
        this.get('selection').addObject(item);
      }else{
        this.get('selection').removeObject(item);
      }
    }
  },

  /**
   * Sets the selection state for a given item. If the `multi` property
   * is true, then the selected state of `item` will be toggled; otherwise
   * the `item` will be selected.
   *
   * @method select
   * @param {*} item The item to select.
   */
  select(item) {
    if (this.get('multi')) {
      this.toggle(item);
    } else if (this.get('selectedItem') !== item) {
      this.setItemSelected(this.get('selectedItem'), false);
      this.setItemSelected(item, true);
    }
  },

  /**
   * Toggles the selection state for `item`.
   *
   * @method toggle
   * @param {*} item The item to toggle.
   */
  toggle: function(item) {
    this.setItemSelected(item, !this.isSelected(item));
  }

});

import Ember from 'ember';

export default Ember.Mixin.create({

  /**
   * Currently selected item index
   *
   * @type {Number}
   */
  selectedIndex: 0,

  /**
   * The class to set on elements when selected.
   *
   * @type {String}
   */
  selectedClass: 'is-selected',

  valuePath: "@index",

  /**
   * Selects the given value.
   *
   * @method select
   * @param {string} value the value to select.
   */
  selectItemAt(index) {
    this.set('selectedIndex', index);
  },

  itemAt(index) {
    return this.get('registeredComponents').objectAt(index);
  },

  selectedItem: Ember.computed('selectedIndex', function() {
    const selectedIndex = this.get('selectedIndex');
    return this.get('registeredComponents').objectAt(selectedIndex);
  }),

  /**
   * Selects the previous item.
   *
   * @method selectPrevious
   */
  selectPrevious() {
    let selectedIndex = this.get('selectedIndex');
    let length = this.get('registeredComponents.length');
    let index = (selectedIndex - 1 + length) % length;
    // this.selectItemAt(index);
    this.focusItemAt(index);
  },

  /**
   * Selects the next item.
   *
   * @method selectNext
   */
  selectNext() {
    let selectedIndex = this.get('selectedIndex');
    let length = this.get('registeredComponents.length');
    let index = (selectedIndex + 1) % length;
    // this.selectItemAt(index);
    this.focusItemAt(index);
    // this.set('selectedIndex', index);
  },

  // _valueForItem(item) {
  //   const valuePath = this.get('valuePath');
  //   return Ember.get(item, valuePath);
  // },

  // _selectionChanged: Ember.observer('selectedIndex', function() {

  // }),

});

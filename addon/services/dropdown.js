import Ember from 'ember';

export default Ember.Service.extend({
  isOpen: false,

  focusWithKeyboardEvent(event){},
  focusPrevious(){
    if (this.get('isOpen') === false) {
      this.open();
    }
  },
  focusNext(){
    if (this.get('isOpen') === false) {
      this.open();
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

  selectFocussedItem(){},

});

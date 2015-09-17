import Ember from 'ember';

export default Ember.Mixin.create({
  _originalBodyStyles: {},

  scrollLocks: Ember.A(),

  lockElementForScrolling(elementId) {
    this.get('scrollLocks').addObject(elementId);
  },

  unlockElementForScrolling(elementId) {
    this.get('scrollLocks').removeObject(elementId);
  },

  scrollLocksDidChange: Ember.observer('scrollLocks.[]', function() {
    const scrollLocks = this.get('scrollLocks');
    if (scrollLocks.length > 0) {
      this.lockScrollInteractions();
    }else{
      this.unlockScrollInteractions();
    }
  }),

  lockScrollInteractions() {
    // Memoize body inline styles:
    this._originalBodyStyles.overflow = document.body.style.overflow;
    this._originalBodyStyles.overflowX = document.body.style.overflowX;
    this._originalBodyStyles.overflowY = document.body.style.overflowY;

    // Disable overflow scrolling on body:
    // TODO(cdata): It is technically not sufficient to hide overflow on
    // body alone. A better solution might be to traverse all ancestors of
    // the current scroll locking element and hide overflow on them. This
    // becomes expensive, though, as it would have to be redone every time
    // a new scroll locking element is added.
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';

    // Modern `wheel` event for mouse wheel scrolling:
    window.addEventListener('wheel', this._scrollInteractionHandler.bind(this), true);
    // Older, non-standard `mousewheel` event for some FF:
    window.addEventListener('mousewheel', this._scrollInteractionHandler.bind(this), true);
    // IE:
    window.addEventListener('DOMMouseScroll', this._scrollInteractionHandler.bind(this), true);
    // Mobile devices can scroll on touch move:
    window.addEventListener('touchmove', this._scrollInteractionHandler.bind(this), true);
    // Capture keydown to prevent scrolling keys (pageup, pagedown etc.)
    document.addEventListener('keydown', this._scrollInteractionHandler.bind(this), true);
  },

  unlockScrollInteractions: function() {
    document.body.style.overflow = this._originalBodyStyles.overflow;
    document.body.style.overflowX = this._originalBodyStyles.overflowX;
    document.body.style.overflowY = this._originalBodyStyles.overflowY;

    window.removeEventListener('wheel', this._scrollInteractionHandler.bind(this), true);
    window.removeEventListener('mousewheel', this._scrollInteractionHandler.bind(this), true);
    window.removeEventListener('DOMMouseScroll', this._scrollInteractionHandler.bind(this), true);
    window.removeEventListener('touchmove', this._scrollInteractionHandler.bind(this), true);
    document.removeEventListener('keydown', this._scrollInteractionHandler.bind(this), true);
  },

  _scrollInteractionHandler: function(event) {

    // console.log(this.$().has(event.target).length);

    // let hasElement = Ember.$(this.get('scrollLocks').map(function(id) { return `#${id}`;})).has(`#${event.target.getAttribute('id')}`).length;
    // console.log(event.target);

    if(this.$().has(event.target).length > 0) {
      console.log('allow');
      return;
    }

    // if (Polymer.IronDropdownScrollManager.elementIsScrollLocked(event.target)) {
    //   if (event.type === 'keydown' &&
    //       !Polymer.IronDropdownScrollManager._isScrollingKeypress(event)) {
    //     return;
    //   }

      event.preventDefault();
    // }
  },
});

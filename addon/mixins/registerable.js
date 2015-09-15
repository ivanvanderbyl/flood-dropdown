import Ember from 'ember';
import Registry from './registry';

export default Ember.Mixin.create({
  registerWithParent: Ember.on('didInsertElement', function() {
    var registry = this.get('parentComponent');
    if (registry) {
      registry.register(this);
    }
  }),

  deregisterWithParent: Ember.on('willDestroyElement', function() {
    var registry = this.get('parentComponent');
    registry.deregister(this);
  }),

  parentComponent: Ember.computed(function() {
    return this.nearestOfType(Registry);
  }),

});

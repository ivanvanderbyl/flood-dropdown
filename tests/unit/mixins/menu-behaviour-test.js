import Ember from 'ember';
import MenuBehaviourMixin from '../../../mixins/menu-behaviour';
import { module, test } from 'qunit';

module('Unit | Mixin | menu behaviour');

// Replace this with your real tests.
test('it works', function(assert) {
  var MenuBehaviourObject = Ember.Object.extend(MenuBehaviourMixin);
  var subject = MenuBehaviourObject.create();
  assert.ok(subject);
});

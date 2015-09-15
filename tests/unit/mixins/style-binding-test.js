import Ember from 'ember';
import StyleBindingMixin from '../../../mixins/style-binding';
import { module, test } from 'qunit';

module('Unit | Mixin | style binding');

// Replace this with your real tests.
test('it works', function(assert) {
  var StyleBindingObject = Ember.Object.extend(StyleBindingMixin);
  var subject = StyleBindingObject.create();
  assert.ok(subject);
});

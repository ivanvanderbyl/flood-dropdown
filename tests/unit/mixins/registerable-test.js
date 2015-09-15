import Ember from 'ember';
import RegisterableMixin from '../../../mixins/registerable';
import { module, test } from 'qunit';

module('Unit | Mixin | registerable');

// Replace this with your real tests.
test('it works', function(assert) {
  var RegisterableObject = Ember.Object.extend(RegisterableMixin);
  var subject = RegisterableObject.create();
  assert.ok(subject);
});

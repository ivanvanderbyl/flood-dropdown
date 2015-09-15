import Ember from 'ember';
import RegisterMixin from '../../../mixins/register';
import { module, test } from 'qunit';

module('Unit | Mixin | register');

// Replace this with your real tests.
test('it works', function(assert) {
  var RegisterObject = Ember.Object.extend(RegisterMixin);
  var subject = RegisterObject.create();
  assert.ok(subject);
});

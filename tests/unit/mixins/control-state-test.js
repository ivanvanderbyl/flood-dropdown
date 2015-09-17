import Ember from 'ember';
import ControlStateMixin from '../../../mixins/control-state';
import { module, test } from 'qunit';

module('Unit | Mixin | control state');

// Replace this with your real tests.
test('it works', function(assert) {
  var ControlStateObject = Ember.Object.extend(ControlStateMixin);
  var subject = ControlStateObject.create();
  assert.ok(subject);
});

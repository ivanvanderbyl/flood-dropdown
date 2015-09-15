import Ember from 'ember';
import FocussableMixin from '../../../mixins/focussable';
import { module, test } from 'qunit';

module('Unit | Mixin | focussable');

// Replace this with your real tests.
test('it works', function(assert) {
  var FocussableObject = Ember.Object.extend(FocussableMixin);
  var subject = FocussableObject.create();
  assert.ok(subject);
});

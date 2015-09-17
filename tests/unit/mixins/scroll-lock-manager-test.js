import Ember from 'ember';
import ScrollLockManagerMixin from '../../../mixins/scroll-lock-manager';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll lock manager');

// Replace this with your real tests.
test('it works', function(assert) {
  var ScrollLockManagerObject = Ember.Object.extend(ScrollLockManagerMixin);
  var subject = ScrollLockManagerObject.create();
  assert.ok(subject);
});

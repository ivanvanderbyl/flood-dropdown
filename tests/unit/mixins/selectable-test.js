import Ember from 'ember';
import SelectableMixin from 'flood-dropdown/mixins/selectable';
import { module, test } from 'qunit';

module('Unit | Mixin | selectable');

// Replace this with your real tests.
test('it works', function(assert) {
  var SelectableObject = Ember.Object.extend(SelectableMixin);
  var subject = SelectableObject.create();
  assert.ok(subject);
});

test('selectNext', function(assert) {
  let SelectableObject = Ember.Object.extend(SelectableMixin);
  let subject = SelectableObject.create();

  subject.get('items').addObject({label: "Item 1"});
  subject.get('items').addObject({label: "Item 2"});
  subject.get('items').addObject({label: "Item 3"});

  assert.equal(subject.get('selectedIndex'), 0, "First item is selected by default");
  assert.equal(subject.get('selectedItem'), subject.get('items').objectAt(0), "Selected 1st item");
  subject.selectNext();
  assert.equal(subject.get('selectedItem'), subject.get('items').objectAt(1), "Selected 2nd item");
  subject.selectNext();
  assert.equal(subject.get('selectedItem'), subject.get('items').objectAt(2), "Selected 3rd item");
});

test('selectPrevious', function(assert) {
  let SelectableObject = Ember.Object.extend(SelectableMixin);
  let subject = SelectableObject.create();

  subject.get('items').addObject({label: "Item 1"});
  subject.get('items').addObject({label: "Item 2"});
  subject.get('items').addObject({label: "Item 3"});

  assert.equal(subject.get('selectedIndex'), 0, "First item is selected by default");
  assert.equal(subject.get('selectedItem'), subject.get('items').objectAt(0), "Selected 1st item");
  subject.selectPrevious();
  assert.equal(subject.get('selectedItem'), subject.get('items').objectAt(2), "Selected 3rd item");
  subject.selectPrevious();
  assert.equal(subject.get('selectedItem'), subject.get('items').objectAt(1), "Selected 2nd item");
});

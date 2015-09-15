import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flood-dropdown-content', 'Integration | Component | flood dropdown content', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{flood-dropdown-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#flood-dropdown-content}}
      template block text
    {{/flood-dropdown-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

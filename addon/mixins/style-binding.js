import Ember from 'ember';

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
};

// Follows syntax at https://developer.mozilla.org/en-US/docs/Web/CSS/content,
// including multiple space separated values.
var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

function buildRule(key, value) {
  if (!isUnitlessNumber[key] && typeof value === 'number') {
    value = `${value}px`;
  }else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
    value = "'" + value.replace(/'/g, "\\'") + "'";
  }
  return Ember.String.dasherize(key) + ': ' + value + ';';
}

export default Ember.Mixin.create({

  concatentatedProperties: ['style'],
  attributeBindings: ['computedStyle:style'],

  computedStyle: Ember.computed('styles.@each', function() {
    const styles = this.get('styles');

    return Object.keys(styles).map((key) => {
      return buildRule(key, styles[key]);
    }).join(' ');
  }),

  // interpretRule(rule) {
  //   let parts = rule.split(':');
  //   return parts.map(this.parseRuleBinding);
  // },

  // parseRuleBinding(part) {
  //   const bindingSyntax = /\[(\w+)\]/;
  //   if (/\[\w+\]/.test(part)) {

  //   }else{
  //     return part;
  //   }
  // },

  /**
   * Bound styles object
   *
   * @type {Object}
   */
  styles: {}
});

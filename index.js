/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'flood-dropdown',

  included: function(app) {
    this._super.included(app);
  },

  treeForStyles: function() {
    var stylesPath = path.join(__dirname, 'addon');
    var stylesTree = new Funnel(this.treeGenerator(stylesPath), {
      srcDir: './styles',
      destDir: '/app/styles'
    });
    return stylesTree;
  }
};

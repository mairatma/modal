'use strict';

var pkg = require('./package.json');
var registerTasks = require('alloyui-tasks');

registerTasks({
  bundleFileName: 'modal.js',
  pkg: pkg
});

import $ from 'jquery';
import Hello from './hello';

require('lazysizes');
require('lazysizes/plugins/bgset/ls.bgset');
require('./foundation');
const wowjs = require('wowjs');

new Hello().initialize();

$(document).foundation();
new wowjs.WOW().init();

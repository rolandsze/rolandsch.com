require('lazysizes');
require('lazysizes/plugins/bgset/ls.bgset');
require('particles.js');

import Typed from 'typed.js';
import selectors from './selectors';
import config from './config';

// Initialize typed.js
new Typed(selectors.hello.caption, config.typed);

// Initialize particles.js
particlesJS(selectors.hello.particles, config.particles);

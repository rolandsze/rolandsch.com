/**
 * Hello component
 */

require('particles.js');
let vsprintf = require('sprintf-js').vsprintf;

import Typed from 'typed.js';

const defaults = {
    selectors: {
        caption: '.hello__caption h1 strong',
        particles: 'hello__particles'
    },
    greetings: [
        'Good %s!^1000 My name is Roland.^550 I am a web developer and I code cool stuffs on the internet.^550 <br>Check out my <a href="%s">GitHub</a>!',
        'Hey, good %s!^1000 I am Roland, a passionate web developer.^550 I can use modern tools to create cool stuffs.^550 <br>Check out my <a href="%s">GitHub</a>!',
    ],
    gitHubUrl: 'http://github.com/rolandsze',
    particles: {
        'particles': {
            'number': {
                'value': 60,
                'density': {
                    'enable': true,
                    'value_area': 800
                }
            },
            'color': {
                'value': '#ffffff'
            },
            'shape': {
                'type': 'circle',
                'stroke': {
                    'width': 0,
                    'color': '#000000'
                },
                'polygon': {
                    'nb_sides': 12
                },
                'image': {
                    'src': 'img/github.svg',
                    'width': 100,
                    'height': 100
                }
            },
            'opacity': {
                'value': 0.5,
                'random': false,
                'anim': {
                    'enable': false,
                    'speed': 1,
                    'opacity_min': 0.1,
                    'sync': false
                }
            },
            'size': {
                'value': 3,
                'random': true,
                'anim': {
                    'enable': false,
                    'speed': 40,
                    'size_min': 0.1,
                    'sync': false
                }
            },
            'line_linked': {
                'enable': true,
                'distance': 150,
                'color': '#ffffff',
                'opacity': 0.4,
                'width': 1
            },
            'move': {
                'enable': true,
                'speed': 2.7,
                'direction': 'none',
                'random': true,
                'straight': false,
                'out_mode': 'out',
                'bounce': false,
                'attract': {
                    'enable': false,
                    'rotateX': 600,
                    'rotateY': 1200
                }
            }
        },
        'interactivity': {
            'detect_on': 'canvas',
            'events': {
                'onhover': {
                    'enable': true,
                    'mode': 'repulse'
                },
                'onclick': {
                    'enable': true,
                    'mode': 'push'
                },
                'resize': true
            },
            'modes': {
                'grab': {
                    'distance': 400,
                    'line_linked': {
                        'opacity': 1
                    }
                },
                'bubble': {
                    'distance': 400,
                    'size': 40,
                    'duration': 2,
                    'opacity': 8,
                    'speed': 3
                },
                'repulse': {
                    'distance': 70,
                    'duration': 0.4
                },
                'push': {
                    'particles_nb': 4
                },
                'remove': {
                    'particles_nb': 2
                }
            }
        },
        'retina_detect': true
    }
};

export default class Hello {
    /**
     * Initialize
     */
    initialize() {
        new Typed(defaults.selectors.caption, {
            strings: [this.getGreetingString()],
            typeSpeed: 27,
            showCursor: true,
            startDelay: 750,
        });

        particlesJS(defaults.selectors.particles, defaults.particles);
    }

    /**
     * Get greeting string
     *
     * @returns string
     */
    getGreetingString() {
        const greeting = defaults.greetings[Math.floor(Math.random() * defaults.greetings.length)];

        return vsprintf(greeting, [this.getPartOfTheDay(), defaults.gitHubUrl]);
    }

    /**
     * Get part of the day
     *
     * @returns string
     */
    getPartOfTheDay() {
        const timestamp = new Date();
        const hours = timestamp.getHours();

        if (hours >= 0 && hours < 12) {
            return 'morning';

        } else if (hours >= 12 && hours < 17) {
            return 'afternoon';

        } else if (hours >= 17 && hours < 24) {
            return 'evening';
        }
    }
}

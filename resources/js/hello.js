/**
 * Hello component
 */

import $ from 'jquery';

let vsprintf = require('sprintf-js').vsprintf;

import Typed from 'typed.js';

const defaults = {
    selectors: {
        caption: '.hello__caption h1 strong',
        downArrow: '.hello__down-arrow',
        typedCursor: '.typed-cursor'
    },
    visibilityClass: 'hide',
    downArrowAnimationClass: 'animated bounce',
    greeting: 'Hi, good %s!^1000 I\'m Roland, a passionate web developer.^550 I build cool stuffs.^550 <br><a href="%s" class="link--solid">Scroll down</a> to know more!',
    scrollToSection: '#about-me',
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
            onComplete: (self) => {
                $(defaults.selectors.typedCursor)
                    .addClass(defaults.visibilityClass);

                $(defaults.selectors.downArrow)
                    .removeClass(defaults.visibilityClass)
                    .addClass(defaults.downArrowAnimationClass);
            }
        });
    }

    /**
     * Get greeting string
     *
     * @returns string
     */
    getGreetingString() {
        return vsprintf(defaults.greeting, [this.getPartOfTheDay(), defaults.scrollToSection]);
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

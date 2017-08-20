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
    greeting: 'Hello!^500 I\'m Roland, a passionate web developer.^500 I build web sites and applications.<br>^500 <a href="%s" class="link--solid">Scroll down</a> to know more!',
    scrollToSection: '#about-me',
};

export default class Hello {
    /**
     * Initialize
     */
    initialize() {
        new Typed(defaults.selectors.caption, {
            strings: [this.getGreetingString()],
            typeSpeed: 30,
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
        return vsprintf(defaults.greeting, [defaults.scrollToSection]);
    }

    /**
     * Get part of the day - not using for now
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

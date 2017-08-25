/**
 * Hello component
 */

import $ from 'jquery';
import Typed from 'typed.js';

const defaults = {
    selectors: {
        typed: '.hello__typed',
        typedCursor: '.typed-cursor'
    },
    sentences: [
        'I\'m a full stack web developer.^750',
        'I build web applications and sites.^750',
        'I code responsive interfaces.^750',
        'I\'m passionate about what I do.'
    ]
};

export default class Hello {
    constructor() {
        new Typed(defaults.selectors.typed, {
            strings: defaults.sentences,
            typeSpeed: 32,
            showCursor: true,
            startDelay: 1250,
            backSpeed: 20,
            onComplete: () => {
                $(defaults.selectors.typedCursor).hide();
            }
        });
    }
}

/**
 * Extend the built in HTML `details` element by making it look more visually
 * like an inline tool tip. This improves the ease-of-use for developers using
 * and users interacting with `details` elements. It does not harm this elements
 * accessibility, all accessibility software will work with this element still.
 *
 * @class ToolTip
 * @extends {HTMLElement}
 */
class KeepCount extends HTMLElement {

    #count = null;

    #sdom = null;

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        // Call the parent (HTMLDetailsElement) constructor first.
        super();
    }

    connectedCallback() {
        setTimeout(() => {
            // Create a shadow DOM for this element.
            this.#sdom = this.attachShadow({ mode: 'open' });
            // Add styles to shadow DOM.
            this.#addStyles();
            // Add the HTML for the custom component.
            this.#addChildren();
        }, 0);
    }

    #addChildren() {
        const wrapper = document.createElement('DIV');
        const down = document.createElement('BUTTON');
        const up = document.createElement('BUTTON');
        const count = document.createElement('DIV');
        down.addEventListener('click', this.#decrease.bind(this));
        down.innerHTML = '-';
        up.addEventListener('click', this.#increase.bind(this));
        up.innerHTML = '+';
        count.innerHTML = 0;
        wrapper.appendChild(down);
        wrapper.appendChild(up);
        wrapper.appendChild(count);
        this.#count = count;
        this.#sdom.appendChild(wrapper);
    }

    #addStyles() {
        const style = document.createElement('STYLE');
        style.innerHTML = `
        button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 2rem;
            width: 2.25rem;
            height: 2.25rem;
            margin-right: 15px;
            cursor: pointer;
        }
        div {
            display: inline-block;
            font-weight: bold;
            font-size: 2rem;
        }
        `;
        this.#sdom.prepend(style);
    }

    #aria(evt) {
        if (evt.keyCode === 13 || evt.keyCode === 32) {
            evt.preventDefault();
            this.toggleToolTip();
        }
    }

    #decrease() {
        let num = parseInt(this.#count.innerHTML, 10) || 0;
        if (num > 0) {
            num -= 1;
            this.#count.innerHTML = num;
        }
    }

    #increase() {
        let num = parseInt(this.#count.innerHTML, 10) || 0;
        num += 1;
        this.#count.innerHTML = num;
    }
}

customElements.define('keep-count', KeepCount);

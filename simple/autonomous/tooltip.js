/**
 * Extend the built in HTML `details` element by making it look more visually
 * like an inline tool tip. This improves the ease-of-use for developers using
 * and users interacting with `details` elements. It does not harm this elements
 * accessibility, all accessibility software will work with this element still.
 *
 * @class ToolTip
 * @extends {HTMLElement}
 */
class ToolTip extends HTMLElement {

    #p = null;

    #sdom = null;

    // eslint-disable-next-line max-len
    #tooltip = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>';

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        // Call the parent (HTMLDetailsElement) constructor first.
        super();
    }

    connectedCallback() {
        setTimeout(() => {
            // Create a shadow DOM for this element.
            this.#sdom = this.attachShadow({ mode: 'open' });
            // Make sure our element is treated as an inline-block.
            this.style.position = 'relative';
            this.style.display = 'inline-block';
            // Make our custom element by adding elements and styles to the shadow DOM.
            this.#addStyles();
            this.#addButton();
            this.#addParagraph();
        }, 0);
    }

    #aria(evt) {
        if (evt.keyCode === 13 || evt.keyCode === 32) {
            evt.preventDefault();
            this.toggleToolTip();
        }
    }

    #addButton() {
        const button = document.createElement('BUTTON');
        button.innerHTML = this.#tooltip;
        // Add listener that toggles the tool tip open or closed.
        button.addEventListener('click', this.toggleToolTip.bind(this));
        // Add ARIA support.
        button.setAttribute('role', 'tooltip');
        button.addEventListener('keydown', this.#aria.bind(this));
        // Add to shadow DOM.
        this.#sdom.appendChild(button);
    }

    #addParagraph() {
        // Automatically wrap the tool tip's content in a `p` tag.
        const p = document.createElement('P');
        p.innerHTML = this.innerHTML;
        p.setAttribute('aria-hidden', true);
        this.#p = p;
        this.#sdom.appendChild(p);
    }

    #addStyles() {
        const style = document.createElement('STYLE');
        style.innerHTML = `
        button {
            cursor: help;
            background-color: transparent;
            border: 0px solid transparent;
        }
        p {
            display: none;
            background-color: #f8f9f9;
            border: 1px solid #bfbfbf;
            border-radius: 3px;
            left: 37px;
            margin: 0;
            padding: 7px 14px;
            position: absolute;
            top: -20px;
            width: 300px;
            z-index: 10;
        }
        `;
        this.#sdom.prepend(style);
    }

    toggleToolTip() {
        if (this.#p) {
            if (this.getAttribute('open')) {
                this.removeAttribute('open');
                this.#p.setAttribute('aria-hidden', true);
                this.#p.style.display = 'none';
                return;
            }
            this.setAttribute('open', true);
            this.#p.setAttribute('aria-hidden', false);
            this.#p.style.display = 'block';
        }
    }
}

customElements.define('tool-tip', ToolTip);

/**
 * Extend the built in HTML `details` element by making it look more visually
 * like an inline tool tip. This improves the ease-of-use for developers using
 * and users interacting with `details` elements. It does not harm this elements
 * accessibility, all accessibility software will work with this element still.
 *
 * @class ToolTip
 * @extends {HTMLDetailsElement}
 */
class ToolTip extends HTMLDetailsElement {

    // eslint-disable-next-line max-len
    #tooltip = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>';

    constructor() {
        // Call the parent (HTMLDetailsElement) constructor first.
        super();
        // Add the `tool tip` class to this element in case the user would like to style it.
        this.classList.add('tool-tip');
    }

    connectedCallback() {
        setTimeout(() => {
            // By default there is no cursor effect for `details` elements. Here we make it the help cursor.
            this.style.cursor = 'help';
            // By default `details` elements are block level, ours should be treated as inline.
            this.style.position = 'relative';
            this.style.display = 'inline-block';
            // Correct the styles for the tool tip paragraph.
            this.#correctToolTip();
            // Add the `summary` element (icon) automatically for the developer.
            this.#addSummary();
        }, 0);
    }

    #addSummary() {
        // If they `summary` element is missing add it with our default `#tooltip` icon.
        let summary = this.querySelector('summary');
        if (!summary) {
            summary = document.createElement('SUMMARY');
            summary.innerHTML = this.#tooltip;
            this.prepend(summary);
        }
        // Remove the marker next to the `summary` element; this is added by default when using `details` elements.
        summary.style.listStyleType = 'none';
    }

    #correctToolTip() {
        // Automatically wrap the tool tip's content in a `p` tag.
        let p = this.querySelector('p');
        if (!p) {
            p = document.createElement('P');
            p.innerHTML = this.innerHTML;
            this.innerHTML = '';
            this.appendChild(p);
        }
        // Overwrite and add styles to the default `p` element.
        p.style.margin = 0;
        p.style.padding = '7px 14px';
        p.style.position = 'absolute';
        p.style.top = '-20px';
        p.style.left = '30px';
        p.style.width = '300px';
        p.style.zIndex = 100;
        p.style.backgroundColor = '#f8f9f9';
        p.style.border = '1px solid #bfbfbf';
        p.style.borderRadius = '3px';
    }
}

customElements.define('tool-tip', ToolTip, { extends: 'details' });

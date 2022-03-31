class PreCode extends HTMLElement {

    #controls = {
        max: null,
        min: null
    };

    #icon = {
        // eslint-disable-next-line max-len
        max: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 9h-2v-5h-7v-2h9v7zm-9 13v-2h7v-5h2v7h-9zm-15-7h2v5h7v2h-9v-7zm9-13v2h-7v5h-2v-7h9z"/></svg>',
        // eslint-disable-next-line max-len
        min: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 2h2v5h7v2h-9v-7zm9 13v2h-7v5h-2v-7h9zm-15 7h-2v-5h-7v-2h9v7zm-9-13v-2h7v-5h2v7h-9z"/></svg>'
    };

    #max = 500;

    #pre = null;

    connectedCallback() {
        setTimeout(() => {
            if (this.getAttribute('max')) {
                this.#max = parseInt(this.getAttribute('max'), 10);
            }
            const pre = this.#getPreElement();
            this.#pre = pre;
            this.after(pre);
            this.remove();
        }, 0);
    }

    #getExpandControls() {
        const div = document.createElement('DIV');
        const max = document.createElement('BUTTON');
        const min = document.createElement('BUTTON');
        div.style.opacity = 0;
        div.style.pointerEvents = 'none';
        this.#controls.max = max;
        this.#controls.min = min;
        max.addEventListener('click', this.#toggleMode.bind(this));
        min.addEventListener('click', this.#toggleMode.bind(this));
        max.innerHTML = this.#icon.max;
        min.innerHTML = this.#icon.min;
        this.#styleButtons(max);
        this.#styleButtons(min);
        min.style.display = 'none';
        div.appendChild(max);
        div.appendChild(min);
        setTimeout(() => {
            this.#showControls();
        }, 1500);
        return div;
    }

    #getPreElement() {
        const pre = document.createElement('PRE');
        const code = document.createElement('CODE');
        const expand = this.#getExpandControls();

        pre.setAttribute('mode', 'min');

        pre.style.position = 'relative';
        pre.style.maxHeight = `${this.#max}px`;

        pre.classList.add('hljs');
        pre.classList.add('pre-code');
        code.classList.add('hljs');
        code.innerHTML = this.innerHTML.trim();

        if (this.getAttribute('lang')) {
            code.classList.add(`language-${this.getAttribute('lang')}`);
        }

        pre.appendChild(expand);
        pre.appendChild(code);
        return pre;
    }

    #showControls() {
        if (this.#pre.scrollHeight > this.#max) {
            const div = this.#pre.querySelector('div');
            div.style.opacity = null;
            div.style.pointerEvents = 'all';
        }
    }

    #styleButtons(elem) {
        elem.style.backgroundColor = 'transparent';
        elem.style.border = '0px solid transparent';
        elem.style.cursor = 'pointer';
        elem.style.position = 'absolute';
        elem.style.right = '5px';
        elem.style.top = '5px';
    }

    #toggleMode() {
        if (this.#pre.getAttribute('mode').toUpperCase() === 'MIN') {
            this.#pre.setAttribute('mode', 'max');
            this.#pre.style.maxHeight = null;
            this.#controls.max.style.display = 'none';
            this.#controls.min.style.display = 'block';
            return;
        }
        this.#pre.setAttribute('mode', 'min');
        this.#pre.style.maxHeight = `${this.#max}px`;
        this.#controls.max.style.display = 'block';
        this.#controls.min.style.display = 'none';
    }

}

customElements.define('pre-code', PreCode);

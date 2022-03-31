class AppFooter extends HTMLElement {

    #icon = {
        // eslint-disable-next-line max-len
        github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        // eslint-disable-next-line max-len
        heart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>'
    };

    constructor() {
        super();
        this.classList.add('app');
    }

    connectedCallback() {
        setTimeout(() => {
            const content = document.createElement('DIV');
            content.classList.add('content');
            content.appendChild(this.#getMakerStatement());
            content.appendChild(this.#getSourceStatement());
            this.appendChild(content);

            const script = document.createElement('SCRIPT');
            script.innerHTML = 'hljs.highlightAll();';
            this.appendChild(script);
        }, 0);
    }

    #getMakerStatement() {
        const div = document.createElement('DIV');
        div.classList.add('maker');
        // eslint-disable-next-line max-len
        div.innerHTML = `Made with <span class="love" title="love">${this.#icon.heart}</span> by <a href="https://github.com/blizzardengle" target="_blank">Christopher Keers</a><br>@ <a href="https://github.com/caboodle-tech" target="_blank">Caboodle Tech Inc</a>`;
        return div;
    }

    #getSourceStatement() {
        const div = document.createElement('DIV');
        div.classList.add('source');
        // eslint-disable-next-line max-len
        div.innerHTML = `Source code is <a href="https://github.com/caboodle-tech/web-component-tutorial/blob/main/README.md" target="_blank">MIT licensed</a><br>and maintained on <a href="https://github.com/caboodle-tech/web-component-tutorial" target="_blank">${this.#icon.github}</a>`;
        return div;
    }
}

customElements.define('app-footer', AppFooter, { extends: 'footer' });

//

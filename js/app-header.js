class AppHeader extends HTMLElement {

    #icon = {
        // eslint-disable-next-line max-len
        back: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>'
    };

    #root = '';

    constructor() {
        super();
        this.classList.add('app');
    }

    connectedCallback() {
        setTimeout(() => {
            this.#setRelative();
            const content = document.createElement('DIV');
            content.classList.add('content');
            content.appendChild(this.#getTitle());
            // Hide the go back nav on the home page.
            if (!this.getAttribute('home')) {
                content.appendChild(this.#getNavigation());
            }
            this.appendChild(content);
        }, 0);
    }

    #getNavigation() {
        const nav = document.createElement('NAV');
        nav.innerHTML = `<ul><li><a href="${this.#root}">${this.#icon.back} Go Back</a></li></ul>`;
        return nav;
    }

    #getTitle() {
        const h1 = document.createElement('H1');
        const title = this.getAttribute('title');
        h1.innerHTML = title;
        return h1;
    }

    #setRelative() {
        const scripts = Array.from(document.scripts);
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            if (script.src.includes('app-header')) {
                let count = script.outerHTML.split('../').length - 1;
                while (count > 0) {
                    this.#root += '../';
                    count -= 1;
                }
                break;
            }
        }
    }
}

customElements.define('app-header', AppHeader, { extends: 'header' });

class BannedImg extends HTMLElement {

    #forbidden = true;

    #icon = {
        // eslint-disable-next-line max-len
        forbidden: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10 12c0 2.397-.85 4.6-2.262 6.324l-14.062-14.062c1.724-1.412 3.927-2.262 6.324-2.262 5.514 0 10 4.486 10 10zm-20 0c0-2.397.85-4.6 2.262-6.324l14.062 14.062c-1.724 1.412-3.927 2.262-6.324 2.262-5.514 0-10-4.486-10-10z"/></svg>'
    };

    #interval = null;

    #opacity = 0;

    #sdom = null;

    connectedCallback() {
        setTimeout(() => {
            this.style.display = 'inline-block';
            this.style.margin = '0 15px';
            this.#sdom = this.attachShadow({ mode: 'open' });
            this.#setupStyles();
            this.#setupImg();
        }, 0);
        setTimeout(() => {
            this.#interval = setInterval(this.#updateOpacity.bind(this), 150);
        }, 3000);
    }

    #setupImg() {
        const div = document.createElement('DIV');
        const img = document.createElement('IMG');
        div.innerHTML = this.#icon.forbidden;
        img.src = this.getAttribute('src');
        div.appendChild(img);
        this.#sdom.appendChild(div);
    }

    #setupStyles() {
        const styles = document.createElement('STYLE');
        styles.innerHTML = `
        *, *:before, *:after {
            box-sizing: border-box;
        }
        div {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 150px;
            height: 150px;
            overflow: hidden;
        }
        svg {
            position: absolute;
            fill: #eb4f4f;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
        img {
            max-width: 80%;
            max-height: 80%;
            width: 80%;
            height: auto;
        }
        `;
        this.#sdom.appendChild(styles);
    }

    #updateOpacity() {
        const svg = this.#sdom.querySelector('svg');
        if (this.#forbidden) {
            this.#opacity += 0.10;
            if (this.#opacity > 0.50) {
                this.#forbidden = false;
                clearInterval(this.#interval);
                setTimeout(() => {
                    this.#interval = setInterval(this.#updateOpacity.bind(this), 150);
                }, 1500);
                return;
            }
            svg.style.opacity = this.#opacity;
            return;
        }
        this.#opacity -= 0.10;
        if (this.#opacity < 0) {
            this.#forbidden = true;
            clearInterval(this.#interval);
            setTimeout(() => {
                this.#interval = setInterval(this.#updateOpacity.bind(this), 150);
            }, 3500);
            return;
        }
        svg.style.opacity = this.#opacity;
    }
}

customElements.define('banned-img', BannedImg);

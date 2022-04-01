/**
 * Autonomous Web Component that places a forbidden sign that fades in and out
 * over each image. Images should be added as children of this element as `data`
 * elements where the `value` attribute is used as the image source and the
 * `innerHTML` value is used as the images `alt` attribute.
 *
 * @class BannedImgs
 * @extends {HTMLElement}
 */
class BannedImgs extends HTMLElement {

    #container = null;

    #fadeIn = true;

    #icon = {
        // eslint-disable-next-line max-len
        forbidden: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10 12c0 2.397-.85 4.6-2.262 6.324l-14.062-14.062c1.724-1.412 3.927-2.262 6.324-2.262 5.514 0 10 4.486 10 10zm-20 0c0-2.397.85-4.6 2.262-6.324l14.062 14.062c-1.724 1.412-3.927 2.262-6.324 2.262-5.514 0-10-4.486-10-10z"/></svg>'
    };

    #interval = null;

    #sdom = null;

    connectedCallback() {
        setTimeout(() => {
            this.style.display = 'block';
            this.#sdom = this.attachShadow({ mode: 'open' });
            this.#setupStyles();
            this.#setupImgs();
            setTimeout(this.#updateOpacity.bind(this), 2000);
        }, 0);
    }

    #setupImgs() {
        // Wrap all the images in a container we style with flex rules.
        const container = document.createElement('DIV');
        container.setAttribute('opacity', 0);
        container.classList.add('container');
        // Retrieve all the data elements and convert them into image elements.
        const datas = this.querySelectorAll('data');
        datas.forEach((data) => {
            const wrapper = document.createElement('DIV');
            const img = document.createElement('IMG');
            wrapper.classList.add('img-wrapper');
            wrapper.innerHTML = this.#icon.forbidden;
            img.src = data.getAttribute('value');
            img.alt = data.innerHTML;
            data.remove();
            wrapper.appendChild(img);
            container.appendChild(wrapper);
        });
        // Keep a reference to the container and add everything to the Shadow DOM.
        this.#container = container;
        this.#sdom.appendChild(container);
    }

    #setupStyles() {
        const styles = document.createElement('STYLE');
        styles.innerHTML = `
        *, *:before, *:after {
            box-sizing: border-box;
        }
        .container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        .container.op1 svg {
            opacity: 0.10;
        }
        .container.op2 svg {
            opacity: 0.20;
        }
        .container.op3 svg {
            opacity: 0.30;
        }
        .container.op4 svg {
            opacity: 0.40;
        }
        .container.op5 svg {
            opacity: 0.50;
        }
        .container.op6 svg {
            opacity: 0.50;
        }
        .img-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 150px;
            height: 150px;
            margin: 15px;
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
        const opacity = parseInt(this.#container.getAttribute('opacity'), 10);
        if (opacity === 7) {
            this.#fadeIn = false;
            clearInterval(this.#interval);
            setTimeout(() => {
                this.#interval = setInterval(this.#updateOpacity.bind(this), 180);
            }, 1000);
        } else if (opacity < 1) {
            this.#fadeIn = true;
            clearInterval(this.#interval);
            setTimeout(() => {
                this.#interval = setInterval(this.#updateOpacity.bind(this), 180);
            }, 2500);
        }
        /**
         * Handle removing and placing the correct class on the container element.
         * This is used with our styles to handle the fade in and out effect.
         */
        if (this.#fadeIn && opacity <= 6) {
            this.#container.classList.remove(`op${opacity - 1}`);
            this.#container.classList.add(`op${opacity}`);
            this.#container.setAttribute('opacity', opacity + 1);
        } else {
            this.#container.classList.remove(`op${opacity - 1}`);
            this.#container.classList.add(`op${opacity - 2}`);
            this.#container.setAttribute('opacity', opacity - 1);
        }
    }
}

customElements.define('banned-imgs', BannedImgs);

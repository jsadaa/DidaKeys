import CastleView from "./CastleView.js";

class LetterCastleView extends CastleView {

    letterContainer = document.querySelector('.letters-container');
    items = [];

    constructor() {
        super();
        this.buildCastle();
        this.addListeners();
    }

    buildCastle() {
        for (let i = 65; i <= 90; i++) {
            this.createLetter(String.fromCharCode(i));
        }
    }

    addListeners() {
        this.items.forEach((item) => {
            item.addEventListener('click', () => {
                this.toggleBlur(item);
            });
        });

        super.addListeners();
    }

    createLetter(letter) {
        const letterElement = document.createElement('button');
        letterElement.classList.add('outline', 'contrast', 'letter-button');
        letterElement.setAttribute('role', 'button');
        letterElement.innerText = letter;
        this.letterContainer.appendChild(letterElement);
        this.items.push(letterElement);
    }
}

export default LetterCastleView;
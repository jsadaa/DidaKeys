import TrailGameView from "./TrailGameView.js";

class LettersGameView extends TrailGameView {

    letterContainer = document.querySelector('.letters-container');
    capitalButton = document.getElementById('capital-button');
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
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                event.preventDefault();

                if (this.isPlaying) {
                    this.pause();
                } else if (this.isPaused) {
                    this.resume();
                    this.play();
                } else {
                    this.play();
                }
            }
        });
        
        this.items.forEach((item) => {
            item.addEventListener('click', () => {
                this.toggleBlur(item);
            });
        });

        this.capitalButton.addEventListener('click', () => {
            this.toggleCapital();
        });

        super.addListeners();
    }

    createLetter(letter) {
        const letterElement = document.createElement('button');
        letterElement.classList.add('outline', 'contrast', 'letter-button', 'uppercase');
        letterElement.setAttribute('role', 'button');
        letterElement.innerText = letter;
        this.letterContainer.appendChild(letterElement);
        this.items.push(letterElement);
    }

    toggleCapital() {
        this.items.forEach((item) => {
            item.classList.toggle('uppercase');
            item.classList.toggle('lowercase');
        });
    }
}

export default LettersGameView;
import TrailGameView from "./TrailGameView.js";

class NumbersGameView extends TrailGameView {

    numberContainer = document.querySelector('.numbers-container');
    calculateButton = document.getElementById('calculate-button');
    calculateMode = false;
    items = [];

    constructor() {
        super();
        this.buildCastle();
        this.addListeners();
    }

    buildCastle() {
        for (let i = 0; i <= 99; i++) {
            this.createNumber(i);
        }
    }

    addListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                event.preventDefault();

                if (!this.calculateMode) {
                    if (this.isPlaying) {
                        this.pause();
                    } else if (this.isPaused) {
                        this.resume();
                        this.play();
                    } else {
                        this.play();
                    }
                }
            }
        });

        this.items.forEach((item) => {
            item.addEventListener('click', () => {
                if (!this.calculateMode) {
                    this.toggleBlur(item);
                } else {
                    if (item.classList.contains('operation')) {
                        this.resetNumber(item);
                    } else if (item.classList.contains('current-operand')) {
                        this.resetNumbers();
                    }
                    else {
                        this.resetNumbers();
                        this.applyCross(item);
                    }
                }
            });
        });

        this.calculateButton.addEventListener('click', () => {
            this.calculateMode = !this.calculateMode;
            this.calculateButton.classList.toggle('selected-game-button');
            if (!this.calculateMode) {
                this.resetNumbers();
            } else {
                this.resetAllButtons();
                this.pauseButton.classList.remove('selected-game-button');
                this.playButton.classList.remove('selected-game-button');
                this.currentItemIndex = 0;
                this.stop();
            }
            this.playButton.disabled = this.calculateMode;
            this.pauseButton.disabled = this.calculateMode;
            this.stopButton.disabled = this.calculateMode;
            this.range.disabled = this.calculateMode;
        });

        super.addListeners();
    }

    createNumber(number) {
        const numberElement = document.createElement('button');
        numberElement.classList.add('outline', 'contrast', 'number-button');
        numberElement.classList.add(`color-group-${Math.floor(number/10)}`);  // Ajouter une classe CSS pour chaque groupe de dix nombres
        numberElement.setAttribute('role', 'button');
        numberElement.innerText = number;
        this.numberContainer.appendChild(numberElement);
        this.items.push(numberElement);
    }

    applyCross(item) {
        const index = this.items.indexOf(item);
        const plusOne = index < 99 ? this.items[index + 1] : null;
        const minusOne = index > 0 ? this.items[index - 1] : null;
        const plusTen = index < 90 ? this.items[index + 10] : null;
        const minusTen = index > 9 ? this.items[index - 10] : null;

        item.classList.add('current-operand');

        if (plusOne) {
            plusOne.innerText = "+1"
            plusOne.classList.add('no-border');
            plusOne.classList.add('operation');
        }

        if (minusOne) {
            minusOne.innerText = "-1"
            minusOne.classList.add('no-border');
            minusOne.classList.add('operation');
        }

        if (plusTen) {
            plusTen.innerText = "+10"
            plusTen.classList.add('no-border');
            plusTen.classList.add('operation');
        }

        if (minusTen) {
            minusTen.innerText = "-10"
            minusTen.classList.add('no-border');
            minusTen.classList.add('operation');
        }

        this.items.forEach((item) => {
            if (item !== plusOne && item !== minusOne && item !== plusTen && item !== minusTen && item !== this.items[index]) {
                item.classList.toggle('blur');
            }
        });
    }

    resetNumber(item) {
        item.innerText = this.items.indexOf(item);
        item.classList.remove('current-operand');
        item.classList.remove('no-border');
        item.classList.remove('operation');
        item.classList.remove('blur');
    }

    resetNumbers() {
        this.items.forEach((item) => {
            this.resetNumber(item);
        });
    }
}

export default NumbersGameView;
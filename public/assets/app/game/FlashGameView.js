class FlashGameView {

    words = document.getElementsByClassName('word');
    img = document.getElementById('lightning-img');
    startButton = document.getElementById('flash-start');
    restartButton = document.getElementById('flash-restart');
    message = document.getElementById('flash-message');
    winMessage = "Gagné !";
    startMessage = "Prêt.e.s ?";
    isStarted = false;
    wordCount = 0;
    step = 0;
    totalSteps = 0;
    elementStack = [];

    constructor() {
        this.addListeners();

        this.wordCount = this.words.length;

        for (let i = 0; i < this.wordCount; i++) {
            this.elementStack.push(this.img);
            this.elementStack.push(this.words[i]);
        }

        this.totalSteps = this.elementStack.length;
    }

    addListeners() {
        this.startButton.addEventListener('click', () => {
            if (!this.isStarted) {
                this.start();
            }
        });

        this.restartButton.addEventListener('click', () => {
            if (!this.isStarted) {
                this.restart();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowRight') {
                event.preventDefault();

                if (this.isStarted) {
                    this.nextStep();
                }
            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();

                if (this.isStarted) {
                    this.prevStep();
                }
            }
        });
    }

    nextStep() {
        if (this.step + 1 === this.totalSteps) {
            this.win();
            return;
        }

        this.elementStack[this.step].style.display = 'none';
        this.elementStack[this.step + 1].style.display = 'block';
        this.step++;
    }

    prevStep() {
        if (this.step > 0) {
            this.elementStack[this.step].style.display = 'none';
            this.elementStack[this.step - 1].style.display = 'block';
            this.step--;
        }
    }

    start() {
        this.startButton.style.display = 'none';
        this.message.style.display = 'none';
        this.img.style.display = 'block'
        this.isStarted = true;
        this.step = 0;
    }

    win() {
        this.isStarted = false;
        this.restartButton.style.display = 'flex';
        this.message.style.display = 'block';
        this.message.innerHTML = this.winMessage;
        this.img.style.display = 'none';
        for (let i = 0; i < this.wordCount; i++) {
            this.words[i].style.display = 'none';
        }
    }

    restart() {
        this.isStarted = false;
        this.startButton.style.display = 'flex';
        this.restartButton.style.display = 'none';
        this.message.style.display = 'block';
        this.message.innerHTML = this.startMessage;
        this.img.style.display = 'none';
        for (let i = 0; i < this.wordCount; i++) {
            this.words[i].style.display = 'none';
        }
    }
}

export default FlashGameView;
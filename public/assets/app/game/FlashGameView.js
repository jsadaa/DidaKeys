class FlashGameView {

    words = document.getElementsByClassName('word');
    img = document.getElementById('lightning-img');
    startButton = document.getElementById('flash-start');
    isStarted = false;
    wordCount = 0;
    step = 0;
    stepCount = 0;
    elementStack = [];

    constructor() {
        this.addListeners();

        this.wordCount = this.words.length;

        for (let i = 0; i < this.wordCount; i++) {
            this.elementStack.push(this.img);
            this.elementStack.push(this.words[i]);
        }

        this.stepCount = this.elementStack.length;
    }

    addListeners() {
        this.startButton.addEventListener('click', () => {
            if (!this.isStarted) {
                this.start();
                this.startButton.style.display = 'none';
                this.img.style.display = 'block';
            }
        });

        // on right arrow key press, go display alternatingly : word -> img -> word -> img
        // knowing the img is already displayed and the step is 0 at the start
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowRight') {
                event.preventDefault();

                if (this.isStarted) {
                    if (this.step + 1 === this.stepCount) {
                        this.stop();
                        return;
                    }

                    this.elementStack[this.step].style.display = 'none';
                    this.elementStack[this.step + 1].style.display = 'block';
                    this.step++;
                }
            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();

                if (this.isStarted) {
                    if (this.step > 0) {
                        this.elementStack[this.step].style.display = 'none';
                        this.elementStack[this.step - 1].style.display = 'block';
                        this.step--;
                    }
                }
            }
        });
    }

    start() {
        this.isStarted = true;
        this.step = 0;
    }

    stop() {
        this.isStarted = false;
        this.startButton.style.display = 'flex';
        this.img.style.display = 'none';
        for (let i = 0; i < this.wordCount; i++) {
            this.words[i].style.display = 'none';
        }
    }
}

export default FlashGameView;
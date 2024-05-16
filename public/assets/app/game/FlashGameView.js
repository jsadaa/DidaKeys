import Game from './Game.js';

class FlashGameView {

    words = document.getElementsByClassName('word');
    img = document.getElementById('lightning-img');
    startButton = document.getElementById('flash-start');
    restartButton = document.getElementById('flash-restart');
    quitButton = document.getElementById('flash-quit');
    message = document.getElementById('flash-message');
    winMessage = "Gagné !";
    loseMessage = "Perdu pour cette fois... 😢 On recommence ?";
    startMessage = "Prêt.e.s ?";
    isStarted = false;
    wordCount = 0;
    step = 0;
    totalSteps = 0;
    elementStack = [];
    game = new Game();
    scoreCounter = document.getElementById('score-counter');
    pagingCounter = document.getElementById('paging-counter');
    keyButton = document.getElementById('flash-key-button');
    audioPlayer = document.getElementById('audio-player');
    audioContainer = document.getElementById('flash-audio');

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

            this.pagingCounter.innerText = `1 / ${this.wordCount}`;
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowRight') {
                event.preventDefault();

                if (this.isStarted) {
                    this.nextStep();
                    this.pagingCounter.innerText = `${Math.floor(this.step / 2) + 1} / ${this.wordCount}`;
                }
            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();

                if (this.isStarted) {
                    this.prevStep();
                    this.pagingCounter.innerText = `${Math.floor(this.step / 2) + 1} / ${this.wordCount}`;
                }
            }
        });

        this.keyButton.addEventListener('click', (event) => {
            this.incrementScore();
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
        this.keyButton.style.display = 'block';
        this.message.style.display = 'none';
        this.img.style.display = 'block'
        this.isStarted = true;
        this.step = 0;
    }

    win() {
        this.isStarted = false;
        this.restartButton.style.display = 'flex';
        this.quitButton.style.display = 'flex';
        this.keyButton.style.display = 'none';
        this.message.style.display = 'block';
        this.message.innerHTML = this.game.keys >= this.wordCount ? this.winMessage : this.loseMessage;
        this.img.style.display = 'none';
        for (let i = 0; i < this.wordCount; i++) {
            this.words[i].style.display = 'none';
        }

        if (this.game.keys >= this.wordCount) {
            this.audioContainer.style.display = 'block';
            this.audioPlayer.play();
        }
    }

    restart() {
        this.isStarted = false;
        this.startButton.style.display = 'flex';
        this.restartButton.style.display = 'none';
        this.quitButton.style.display = 'none';
        this.keyButton.style.display = 'none';
        this.message.style.display = 'block';
        this.message.innerHTML = this.startMessage;
        this.img.style.display = 'none';
        for (let i = 0; i < this.wordCount; i++) {
            this.words[i].style.display = 'none';
        }
        this.game.clearKeys();
        this.scoreCounter.innerText = this.game.getKeysString();
        this.audioContainer.style.display = 'none';
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
    }

    incrementScore() {
        this.game.addKey();
        this.scoreCounter.innerText = this.game.getKeysString();
    }
}

export default FlashGameView;

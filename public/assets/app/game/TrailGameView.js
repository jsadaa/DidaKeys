import Game from './Game.js';

class TrailGameView {

    playButton = document.getElementById('play-button');
    pauseButton = document.getElementById('pause-button');
    stopButton = document.getElementById('stop-button');
    revealAllButton = document.getElementById('reveal-button');
    range = document.getElementById('range');
    rangeValueContainer = document.getElementById('range-value');
    scoreCounter = document.getElementById('score-counter');
    keyButton = document.getElementById('key-button');
    items = [];
    game = new Game();
    isPlaying = false;
    isPaused = false;
    currentItemIndex = 0;

    constructor() {}

    buildCastle() {}

    addListeners() {
        this.playButton.addEventListener('click', () => {
            this.playButton.classList.add('selected-game-button');
            this.pauseButton.classList.remove('selected-game-button');
            this.stopButton.classList.remove('selected-game-button');

            if (!this.isPlaying && !this.isPaused) { // new condition here
                this.play();
            }
            else if (this.isPaused) {
                this.resume();
                this.play();
            }
        });

        this.pauseButton.addEventListener('click', () => {
            this.pauseButton.classList.add('selected-game-button');
            this.playButton.classList.remove('selected-game-button');
            this.stopButton.classList.remove('selected-game-button');
            this.pause();
        });

        this.stopButton.addEventListener('click', () => {
            this.playButton.classList.remove('selected-game-button');
            this.pauseButton.classList.remove('selected-game-button');
            this.stop();
        });

        this.range.addEventListener('input', () => {
            this.rangeValueContainer.innerText = this.getRangeValue()
        });

        this.keyButton.addEventListener('click', () => {
            this.incrementScore();
        });

        this.revealAllButton.addEventListener('click', () => {
            this.revealAll();
        });
    }

    incrementScore() {
        this.game.addKey();
        this.scoreCounter.innerText = this.game.getKeysString();
    }

    toggleBlur(item) {
        item.classList.toggle('blur');
    }

    revealAll() {
        this.items.forEach((item) => {
            item.classList.remove('blur');
        });
    }

    getRangeValue() {
        return this.range.value;
    }

    highlightButton(item) {
        item.classList.add('highlight-button');
    }

    toneDownButton(item) {
        item.classList.remove('highlight-button');
    }

    resetAllButtons() {
        this.items.forEach((item) => {
            this.toneDownButton(item);
        });
    }

    play() {
        this.start(this.items, this.getRangeValue(), this.currentItemIndex)
            .then(() => {
                if (!this.isPaused) {
                    this.stop();
                    this.playButton.classList.remove('selected-game-button');
                }
            });
    }

    async start(items, speed, start = 0) {
        this.isPlaying = true;
        this.range.disabled = true;
        for (let index = start; index < items.length; index++) {
            if (!this.isPlaying) {
                break;
            }
            this.currentItemIndex = index;
            let numberElement = items[index];
            this.highlightButton(numberElement);
            await new Promise(resolve => setTimeout(() => {
                if (this.isPlaying) {
                    this.toneDownButton(numberElement);
                }
                resolve();
            }, speed * 1000));
        }
    }

    pause() {
        this.isPlaying = false;
        this.isPaused = true;
        this.range.disabled = false;
    }

    resume() {
        this.isPlaying = true;
        this.isPaused = false;
        this.range.disabled = true;
    }

    stop() {
        this.isPlaying = false;
        this.range.disabled = false;
        this.currentItemIndex = 0;
        this.resetAllButtons();
    }
}

export default TrailGameView;
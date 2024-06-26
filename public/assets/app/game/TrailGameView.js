import Game from './Game.js';

class TrailGameView {

    playButton = document.getElementById('play-button');
    pauseButton = document.getElementById('pause-button');
    stopButton = document.getElementById('stop-button');
    revealAllButton = document.getElementById('reveal-button');
    fullscreenButton = document.getElementById('fullscreen-button');
    range = document.getElementById('range');
    rangeValueContainer = document.getElementById('range-value');
    scoreCounter = document.getElementById('score-counter');
    keyButton = document.getElementById('key-button');
    isOpenClass = "modal-is-open";
    openingClass = "modal-is-opening";
    closingClass = "modal-is-closing";
    scrollbarWidthCssVar = "--pico-scrollbar-width";
    animationDuration = 400; // ms
    visibleModal = null;
    confirmModal = document.getElementById('modal-confirm');
    modalImage = document.getElementById('modal-img');
    audioPlayer = document.getElementById('audio-player');
    items = [];
    game = new Game();
    isPlaying = false;
    isPaused = false;
    currentItemIndex = 0;

    constructor() {
        this.audioPlayer.volume = 0.7;
    }

    buildCastle() {}

    addListeners() {
        this.playButton.addEventListener('click', () => {
            this.playButton.classList.add('selected-game-button');
            this.pauseButton.classList.remove('selected-game-button');
            this.stopButton.classList.remove('selected-game-button');

            if (!this.isPlaying && !this.isPaused) {
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

        this.keyButton.addEventListener('click', (event) => {
            this.incrementScore();
            this.toggleModal(event);
        });

        this.revealAllButton.addEventListener('click', () => {
            this.revealAll();
        });

        document.addEventListener("click", (event) => {
            if (this.visibleModal === null) return;
            const modalContent = this.visibleModal.querySelector("article");
            const isClickInside = modalContent.contains(event.target);
            !isClickInside && this.closeModal(this.visibleModal);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && this.visibleModal) {
              this.closeModal(this.visibleModal);
            }
          });

        this.confirmModal.addEventListener('click', (event) => {
            this.toggleModal(event);
        });

        this.fullscreenButton.addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }

    toggleModal = (event) => {
        event.preventDefault();
        const modal = document.getElementById('modal');
        if (!modal) return;
        modal && (modal.open ? this.closeModal(modal) : this.openModal(modal));
    };

    toggleFullscreen = () => {
        const { documentElement: html } = document;
        if (document.fullscreenElement) {
            document.exitFullscreen().then(r => r).catch(e => console.error(e));
        } else {
            html.requestFullscreen().then(r => r).catch(e => console.error(e));
        }
    }

    openModal = (modal) => {

        const random = Math.floor(Math.random() * 7) + 1;
        this.modalImage.src = `/assets/img/win-${random}.webp`;

        const { documentElement: html } = document;
        const scrollbarWidth = this.getScrollbarWidth();
        if (scrollbarWidth) {
            html.style.setProperty(this.scrollbarWidthCssVar, `${scrollbarWidth}px`);
        }
        html.classList.add(this.isOpenClass, this.openingClass);
        setTimeout(() => {
            this.visibleModal = modal;
            html.classList.remove(this.openingClass);
        }, this.animationDuration);
        modal.showModal();

        this.audioPlayer.play();
    };

    closeModal = (modal) => {
        this.visibleModal = null;
        const { documentElement: html } = document;
        html.classList.add(this.closingClass);
        setTimeout(() => {
            html.classList.remove(this.closingClass, this.isOpenClass);
            html.style.removeProperty(this.scrollbarWidthCssVar);
            modal.close();
        }, this.animationDuration);

        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
    };

    getScrollbarWidth = () => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        return scrollbarWidth;
    };

    isScrollbarVisible = () => {
        return document.body.scrollHeight > screen.height;
    };

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

class WordListView {

    addWordButton = document.getElementById('add-word');
    form = document.querySelector('form');
    removeWordButtons = document.querySelectorAll('.remove-word');

    constructor() {
        this.addListeners();
    }

    addListeners() {
        this.addWordButton.addEventListener('click', this.addWord);

        this.removeWordButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.removeWord(button);
            });
        });
    }

    addWord = () => {
        const wordContainers = document.querySelectorAll('.word-input-container');
        const wordContainer = wordContainers[wordContainers.length - 1];
        const newWordContainer = wordContainer.cloneNode(true);
        const wordInput = newWordContainer.querySelector('.word-input');
        const removeWordButton = newWordContainer.querySelector('.remove-word');

        wordInput.value = '';
        removeWordButton.removeAttribute('disabled');
        removeWordButton.addEventListener('click', () => this.removeWord(removeWordButton));
        wordContainer.after(newWordContainer);
    }

    removeWord(button) {
        const wordInputContainer = button.parentElement;
        wordInputContainer.remove();
    }
}

export default WordListView;
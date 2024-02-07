class WordListView {

    addWordButton = document.getElementById('add-word');
    removeWordButton = document.getElementById('remove-word');

    constructor() {
       this.addListeners();
    }

    addListeners() {
        this.addWordButton.addEventListener('click', this.addWord);
        this.removeWordButton.addEventListener('click', this.removeWord);
    }

    addWord() {
        const wordInput = document.querySelector('.word-input:last-of-type');
        const newWordInput = wordInput.cloneNode(true);
        newWordInput.value = '';
        wordInput.after(newWordInput);
    }

    removeWord() {
        // get all elements with class word-input
        const wordInputs = document.querySelectorAll('.word-input');
        // if there is more than one word-input, remove the last one
        if (wordInputs.length > 1) {
            wordInputs[wordInputs.length - 1].remove();
        }
    }
}

export default WordListView;
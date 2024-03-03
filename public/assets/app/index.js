import Theme from './Theme.js';
import LettersGameView  from "./game/LettersGameView.js";
import NumbersGameView from "./game/NumbersGameView.js";
import Router from './Router.js';
import WordListView from "./game-setup/WordListView.js";
import FlashGameView from "./game/FlashGameView.js";

let _theme = new Theme();
let router = new Router();

router.addRoute('/number/game', () => {
    let _numbersGameView = new NumbersGameView();
});

router.addRoute('/letter/game', () => {
    let _lettersGameView = new LettersGameView();
});

router.addRoute('/flash-words', () => {
    let _wordListView = new WordListView();
});

router.addRoute('/flash-words/edit', () => {
    let _wordListView = new WordListView();
});

router.addRoute('/flash-words/play', () => {
    let _flashGameView = new FlashGameView();
});

router.addRoute('', () => {

});

window.onload = () => {
    let path = window.location.pathname.replace(/\/\d*$/, '').valueOf();
    router.navigate(path);
};
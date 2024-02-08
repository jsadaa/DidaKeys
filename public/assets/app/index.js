import Theme from './Theme.js';
import LettersGameView  from "./game/LettersGameView.js";
import NumbersGameView from "./game/NumbersGameView.js";
import Router from './Router.js';
import WordListView from "./game-setup/WordListView.js";

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

router.addRoute('/', () => {

});

window.onload = () => {
    router.navigate(window.location.pathname);
};
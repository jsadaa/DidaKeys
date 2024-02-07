import Theme from './Theme.js';
import LetterCastleView  from "./castle/LetterCastleView.js";
import NumberCastleView from "./castle/NumberCastleView.js";
import Router from './Router.js';

let _theme = new Theme();
let router = new Router();

router.addRoute('/number/castle', () => {
    let _numberCastleView = new NumberCastleView();
});
router.addRoute('/letter/castle', () => {
    let _letterCastleView = new LetterCastleView();
});

router.addRoute('/', () => {

});

window.onload = () => {
    router.navigate(window.location.pathname);
};
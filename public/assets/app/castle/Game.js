class Game {

    keys = 0;

    constructor() {
    }

    addKey() {
        this.keys++;
    }

    removeKey() {
        this.keys--;
    }

    clearKeys() {
        this.keys = 0;
    }

    getKeys() {
        return this.keys;
    }

    getKeysString() {
        return this.keys.toString();
    }
}

export default Game;
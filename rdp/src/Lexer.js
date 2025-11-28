class Lexer {

    init(string) {
        this._input = string;
        this._cursor = 0;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._input.slice(this._cursor);

        // T_INT_LIT:
        if (!isNaN(Number(string[0]))) {
            let value = '';
            while (!isNaN(Number(string[this._cursor]))) {
                value += string[this._cursor++];
            }
            return {
                type: 'T_INT_LIT',
                value: value,
            }
        }

        // T_STRING_LIT
        if (string[0] === '"') {
            let value = '';
            do {
                value += string[++this._cursor];
            } while (string[this._cursor + 1] !== '"' && !this.isEOF());
            return {
                type: 'T_STRING_LIT',
                value: value,
            }
        }

        throw new Error(`Lexical Error: Unrecognized token starting at: ${string[0]}`);
    }

    hasMoreTokens() {
        return this._cursor < this._input.length;
    }

    isEOF() {
        return this._cursor >= this._input.length;
    }

}

module.exports = {
    Lexer,
}
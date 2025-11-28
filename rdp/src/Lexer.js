const Spec = [
    [/^\s+/, null],
    [/^\d+/, 'T_INT_LIT'],
    [/^"[^"]*"/, 'T_STRING_LIT'],
    [/^'[^']*'/, 'T_STRING_LIT'],
]

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

        for (const [regex, type] of Spec) {
            const value = this._match(string, regex);

            if (value == null) {
                continue;
            }

            if (type == null) {
                return this.getNextToken();
            }

            if (value) {
                return { type, value, }
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

    _match(string, regex) {
        const matched = regex.exec(string);
        if (matched) {
            this._cursor += matched[0].length;
            return matched[0];
        }
    }

}

module.exports = {
    Lexer,
}
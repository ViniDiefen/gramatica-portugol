const { Lexer } = require('./Lexer');

class Parser {

    constructor() {
        this._input = '';
        this._lexer = new Lexer();
    }

    parse(string) {
        this._input = string;
        this._lexer.init(string);

        this._lookahead = this._lexer.getNextToken();

        return this.algoritmo();
    }

    algoritmo() {
        return {
            type: 'algoritmo',
            body: this.literal(),
        };
    }

    /**
     * literal:
     *   : T_INT_LIT
     *   | T_STRING_LIT
     *   ;
     */
    literal() {
        const token = this._lookahead.type;
        switch (token) {
            case 'T_INT_LIT':
                return this.T_INT_LIT();
            case 'T_STRING_LIT':
                return this.T_STRING_LIT();
            default:
                throw new Error(`Syntax Error: ${token} not recognized as literal`);
        }
    }

    T_INT_LIT() {
        const token = this._eat('T_INT_LIT');
        return { type: token.type, value: Number(token.value) };
    }

    T_STRING_LIT() {
        const token = this._eat('T_STRING_LIT');
        return { type: token.type, value: token.value.slice(1, -1) };
    }

    _eat(tokenType) {
        const token = this._lookahead;

        if (token.type === tokenType) {
            this._lookahead = this._lexer.getNextToken();
            return token;
        }

        throw new Error(`Syntax Error: ${token.type}, expected ${tokenType}`);
    }

}

module.exports = {
    Parser,
};
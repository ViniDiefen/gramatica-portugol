# Trabalho Gramática

Necessário:
Lexer -> Analisador léxico
Parser -> Analisador sintático

Lexer -> AFD grande, o qual pode gerar tokens baseado no estado final
Parser -> AP capaz de analisar os tokes

## Lexer

### Sintaxe Portugol

```portugol
algoritmo exemplo;

variáveis
    n : inteiro;
fim-variáveis

início
    imprima("Digite um número:");
    n := leia();

    se (n > 0) então
        imprima("Soma de 1 até ", n, " = ", soma(n));
    fim-se

fim

função soma(x: inteiro) : inteiro
res : inteiro;
i : inteiro;
z : real;
início
    res := 0;

    para i de 1 até x faça
        res := res + i;
    fim-para

    retorne res;
fim
```

### Resultado tokenizado (beaseado na seção de "gramática" do G-Portugol)**

```Plain text
KW_ALGORITMO T_IDENTIFICADOR SEMICOLON

KW_VARIAVEIS
    T_IDENTIFICADOR COLON KW_INTEIRO SEMICOLON
KW_FIM_VARIAVEIS

KW_INICIO
    T_IDENTIFICADOR LPAREN T_STRING_LIT RPAREN SEMICOLON
    T_IDENTIFICADOR OP_ATRIB T_IDENTIFICADOR LPAREN RPAREN SEMICOLON


    KW_SE LPAREN T_IDENTIFICADOR OP_GT T_INT_LIT RPAREN KW_ENTAO
        T_IDENTIFICADOR LPAREN T_STRING_LIT COMMA T_IDENTIFICADOR COMMA T_STRING_LIT COMMA T_IDENTIFICADOR LPAREN T_IDENTIFICADOR RPAREN RPAREN SEMICOLON
    KW_FIMSE
KW_FIM

KW_FUNCAO T_IDENTIFICADOR LPAREN T_IDENTIFICADOR COLON KW_INTEIRO RPAREN COLON KW_INTEIRO
T_IDENTIFICADOR COLON KW_INTEIRO SEMICOLON
T_IDENTIFICADOR COLON KW_INTEIRO SEMICOLON
T_IDENTIFICADOR COLON KW_REAL SEMICOLON
KW_INICIO
    T_IDENTIFICADOR OP_ATRIB T_INT_LIT SEMICOLON

    KW_PARA T_IDENTIFICADOR KW_DE T_INT_LIT KW_ATE T_IDENTIFICADOR KW_FACA
        T_IDENTIFICADOR OP_ATRIB T_IDENTIFICADOR OP_SOMA T_IDENTIFICADOR SEMICOLON
    KW_FIM_PARA

    KW_RETORNE T_IDENTIFICADOR;
KW_FIM
```

### Tabela de regras do lexer

| TOKEN            | REGEX                    |
|------------------|--------------------------|
| KW_ALGORITMO     | `algoritmo`              |
| KW_VARIAVEIS     | `variáveis`              |
| KW_FIM_VARIAVEIS | `fim-variáveis`          |
| KW_INICIO        | `início`                 |
| KW_FIM           | `fim`                    |
| KW_FUNCAO        | `função`                 |
| KW_INTEIRO       | `inteiro`                |
| KW_REAL          | `real`                   |
| KW_SE            | `se`                     |
| KW_ENTAO         | `então`                  |
| KW_FIMSE         | `fim-se`                 |
| KW_PARA          | `para`                   |
| KW_DE            | `de`                     |
| KW_ATE           | `até`                    |
| KW_FACA          | `faça`                   |
| KW_FIM_PARA      | `fim-para`               |
| KW_RETORNE       | `retorne`                |
| OP_ATRIB         | `:=`                     |
| OP_SOMA          | `+`                      |
| OP_GT            | `>`                      |
| LPAREN           | `(`                      |
| RPAREN           | `)`                      |
| COMMA            | `,`                      |
| COLON            | `:`                      |
| SEMICOLON        | `;`                      |
| T_IDENTIFICADOR  | `[A-Za-z_][A-Za-z0-9_]*` |
| T_INT_LIT        | `[0-9]+`                 |
| T_STRING_LIT     | `"[^\n]*"`               |

**Mecânica do lexer (explicado em outras palavras por IA):**

1. O lexer lê caracteres da esquerda para a direita, mantendo um “current lexeme” (seu buffer).
2. A cada caractere, ele tenta avançar no AFD gigante = combinação de todas REGEX.
3. Se o AFD ainda está em um estado válido, você continua lendo.
4. Se o AFD chega a um estado final, você marca isso como “última posição onde um token válido terminou”.
5. Se o próximo caractere causar erro (transição impossível), o lexer retrocede para a última posição marcada como válida e emite aquele token.

OBS: deve ter um tratamento no lexer para ignorar espaços, tabulações ou quebra de linha, como: `[\s\t\n\r]+`

## Parser

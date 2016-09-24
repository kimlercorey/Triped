/* BASIC RULES ATM */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"is"(\s?an?)?\b       return 'ISA'
"required"            return 'REQUIRED'
"("                   return 'LPAREN'
")"                   return 'RPAREN'
[a-zA-Z0-9\.\-\_]+\b  return 'WORD'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-' 'WORD'
%left '*' '/' 'ISA' 'MUC' 'MUE'
%left '^' 'REQUIRED'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e 'ISA' e
        {$$ = $1 + ' ISA ' + $3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    | MUC
        {$$ = 'MUC';}
    | MUE
        {$$ = 'MUE';}
    | WORD
        {$$ = 'WORD';}
    | ISA    
        {$$ = 'ISA';}
    | REQUIRED    
        {$$ = 'REQUIRED';}

    ;

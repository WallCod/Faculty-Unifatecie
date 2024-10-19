#include <stdio.h>
#include <string.h>

#define MAX_LIVROS 100
#define TAMANHO_TITULO 100

// Função para exibir todos os livros
void exibir_livros(char livros[][TAMANHO_TITULO], int total) {
    printf("Lista de livros:\n");
    for (int i = 0; i < total; i++) {
        printf("%s\n", livros[i]);
    }
}

//Função para remover um livro
void remover_livro(char livros[][TAMANHO_TITULO], int *total, char livro_para_remover[]) {
    int encotrado = 0;
    for (int i = 0; i < *total; i++) {
        if (strcmp(livros[i], livro_para_remover) == 0) {
            encotrado = 1;
            for (int j = i; j <*total - 1; j++) {
                strcpy(livros[j], livros[j + 1]);
            }
            (*total)--;
            break;
        }
    }
    if (encotrado) {
        printf("O livro \"%s\" foi removido.\n", livro_para_remover);
    } else {
        printf("O livro \"%s\" não foi encontrado na lista.\n", livro_para_remover);
    }
} 

int main () {
    char livros[MAX_LIVROS][TAMANHO_TITULO] = {
        "LIVRO A",
        "LIVRO B",
        "LIVRO C",
        "LIVRO D"
    };
    int total_livros = 4;

    exibir_livros(livros, total_livros);

    remover_livro(livros, &total_livros, "LIVRO B");
    exibir_livros(livros, total_livros);

    return 0;
}



/*O que este código faz:
Define constantes:

MAX_LIVROS: O número máximo de livros que a lista pode armazenar.

TAMANHO_TITULO: O tamanho máximo do título de cada livro.

Função exibir_livros:

Exibe todos os livros atualmente na lista.

Função remover_livro:

Procura pelo livro que deve ser removido.

Se encontrado, remove o livro deslocando os livros subsequentes para preencher o espaço.

Atualiza o total de livros.

Informa se o livro foi removido ou não encontrado.

Função main:

Inicializa a lista de livros.

Chama a função exibir_livros para mostrar a lista original.

Remove um livro específico.

Exibe a lista atualizada de livros. */


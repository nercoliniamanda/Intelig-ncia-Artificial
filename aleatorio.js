const nomes = ["Fernanda", "Giuliana", "Maria Eduarda", "Marcelo", "Amanda", "Gustavo", "Gabriel"]; // Array de nomes

export function aleatorio(lista) { // Função para gerar uma afirmação aleatória
    const posicao = Math.floor(Math.random() * lista.length); // Gerando um número aleatório entre 0 e o tamanho da lista
    return lista[posicao]; // Retornando a afirmação correspondente ao índice gerado
} // Fim da função aleatorio

export const nome = aleatorio(nomes) // Exportando a variável nome da biblioteca aleatorio.js
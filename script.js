import { aleatorio, nome } from './aleatorio.js'; // Importando a função aleatorio() e a variável nome da biblioteca aleatorio.js
import { perguntas } from './perguntas.js'; // Importando a função perguntas() da biblioteca perguntas.js

const caixaPrincipal = document.querySelector(".caixa-principal"); // Selecionando a caixa principal do HTML
const caixaPerguntas = document.querySelector(".caixa-perguntas"); // Selecionando a caixa de perguntas do HTML
const caixaAlternativas = document.querySelector(".caixa-alternativas"); // Selecionando a caixa de alternativas do HTML
const caixaResultado = document.querySelector(".caixa-resultado"); // Selecionando a caixa de resultado do HTML
const textoResultado = document.querySelector(".texto-resultado"); // Selecionando o elemento de texto do resultado do HTML     
const botaoJogarNovamente = document.querySelector(".novamente-btn"); // Selecionando o botão de jogar novamente do HTML
const botaoIniciar = document.querySelector(".iniciar-btn"); // Selecionando o botão de iniciar do HTML
const telaInicial = document.querySelector(".tela-inicial"); // Selecionando a tela inicial do HTML

let atual = 0; // Variável para armazenar o índice da pergunta atual
let perguntaAtual; // Variável para armazenar a pergunta atual
let historiaFinal = ""; // Variável para armazenar a história final

botaoIniciar.addEventListener('click', iniciaJogo); // Adicionando um evento de clique ao botão de iniciar

function iniciaJogo() { // Função para iniciar o jogo
    atual = 0; // Inicializando o índice da pergunta atual
    historiaFinal = ""; // Limpando a história final
    telaInicial.style.display = 'none'; // Ocultando a tela inicial
    caixaPerguntas.classList.remove("mostrar"); // Removendo a classe mostrar da caixa de perguntas
    caixaAlternativas.classList.remove("mostrar"); // Removendo a classe mostrar da caixa de alternativas
    caixaResultado.classList.remove("mostrar"); // Removendo a classe mostrar da caixa de resultado
    mostraPergunta(); // Chamando a função mostraPergunta()
} // Fim da função iniciaJogo

function mostraPergunta() { // Função para mostrar a pergunta atual
    if (atual >= perguntas.length) { // Verificando se chegou ao final das perguntas
        mostraResultado(); // Chamando a função para mostrar o resultado
        return; // Retornando para a função iniciaJogo()
    } // Fim do if
    perguntaAtual = perguntas[atual]; // Atribuindo a pergunta atual à variável perguntaAtual
    caixaPerguntas.textContent = perguntaAtual.enunciado; // Atribuindo o enunciado da pergunta à caixa de perguntas
    caixaAlternativas.textContent = ""; // Limpando a caixa de alternativas
    mostraAlternativas(); // Chamando a função para mostrar as alternativas
} // Fim da função mostraPergunta

function mostraAlternativas() { // Função para mostrar as alternativas
    for (const alternativa of perguntaAtual.alternativas) { // Percorrendo as alternativas da pergunta atual
        const botaoAlternativas = document.createElement("button"); // Criando um botão HTML
        botaoAlternativas.textContent = alternativa.texto; // Atribuindo o texto da alternativa ao botão
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa)); // Adicionando um evento de clique ao botão
        caixaAlternativas.appendChild(botaoAlternativas); // Adicionando o botão à caixa de alternativas
    }
}

function respostaSelecionada(opcaoSelecionada) { // Função para tratar a resposta selecionada
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao); // Gerando as afirmações aleatórias da opção selecionada
    historiaFinal += afirmacoes + " "; // Adicionando as afirmações à história final
    if (opcaoSelecionada.proxima !== undefined) { // Verificando se há próxima pergunta
        atual = opcaoSelecionada.proxima; // Atualizando o índice da pergunta atual
    } else { // Se não houver próxima pergunta
        mostraResultado(); // Chamando a função para mostrar o resultado
        return; // Retornando para a função iniciaJogo()
    } // Fim do if
    mostraPergunta(); // Chamando a função para mostrar a próx
} // Fim da função respostaSelecionada

function mostraResultado() { // Função para mostrar o resultado
    caixaPerguntas.textContent = `Em 2049, ${nome}`; // Atribuindo o nome da pessoa à caixa de perguntas
    textoResultado.textContent = historiaFinal; // Atribuindo a história final ao texto do resultado
    caixaAlternativas.textContent = ""; // Limpando a caixa de alternativas
    caixaResultado.classList.add("mostrar"); // Adicionando a classe mostrar à caixa de resultado
    botaoJogarNovamente.addEventListener("click", jogaNovamente); // Adicionando um evento de clique ao botão de jogar novamente
} // Fim da função mostraResultado

function jogaNovamente() { // Função para jogar novamente
    atual = 0; // Reiniciando o índice da pergunta atual
    historiaFinal = ""; // Limpando a história final
    caixaResultado.classList.remove("mostrar"); // Removendo a classe mostrar da caixa de resultado
    mostraPergunta(); // Chamando a função para mostrar a pergunta
} // Fim da função jogaNovamente

function substituiNome() { // Função para substituir o nome da pessoa
    for (const pergunta of perguntas) { // Percorrendo as perguntas
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome); // Substituindo o nome da pessoa no enunciado da pergunta
    } // Fim do for
} // Fim da função substituiNome

substituiNome(); // Chamando a função para substituir o nome na história final
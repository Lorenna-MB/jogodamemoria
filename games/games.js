const characters = {
    pokemons: [
        'pikachu',
        'charmander',
        'cubone',
        'gengar',
        'snorlax',
        'mewtwo',
        'jigglypuff',
        'psyduck',
        'bulbasaur',
        'squirtle',
    ],
    hunters: [
        'alluka',
        'chrollo',
        'gon',
        'hisoka',
        'kaito',
        'killua',
        'komugi',
        'meruem',
        'kurapika',
        'leorio',
    ]
};

const grid = document.querySelector('.grid');
const playerName = localStorage.getItem('player');
const config = JSON.parse(localStorage.getItem('config'));
const playerName1 = config.playerName;
const playerName2 = config.player2Name || 'Player 2';

let currentPlayer = 1;
let p1Score = 0;
let p2Score = 0;

//Criar itens dinamicamente
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//Cria duas variáveis para armazenar as duas cartas reveladas em uma jogada.
let firstCard= ''; 
let secondCard= '';
let points = 0;

function showEndGameModal(score, time) {
    let modal = document.createElement('div');
    //Utilizando uma classe html para estilizar o modal
    modal.className = 'endgame-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 id="endGame">Fim de Jogo!</h2>
            <p>Pontuação: ${score}</p>
            <p>Tempo: ${time}</p>
            <button id="close-modal">Fechar</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('close-modal').onclick = () => {
        modal.remove();
        resetGame();
    };
}

const checkEndGame = () => {
    // Seleciona todas as cartas que estão reveladas e desabilitadas
    const revealedCards = document.querySelectorAll('.reveal-card .disabled-card');
    let totalCards = 20; // difícil

    if (config.difficulty === 'facil' || config.difficulty === 'fácil' || config.difficulty === 'easy') {
        totalCards = 8;
    } else if (config.difficulty === 'medio' || config.difficulty === 'médio' || config.difficulty === 'medium') {
        totalCards = 16;
    }

    // Cada par tem duas cartas, então totalCards é o número de pares * 2
    if (revealedCards.length === totalCards) {
        stopTime();
        let score = config.modo === '2' ? `P1: ${p1Score} | P2: ${p2Score}` : points;
        let time = document.getElementById('timer').textContent;
        showEndGameModal(score, time);
        console.log('Fim de Jogo!');
    }
}

//A função que é chamada sempre que duas cartas convergem e de acordo com o jogador atual.
 function sumPoints() {
    if (config.modo === '2') {
        if (currentPlayer === 1) {
            p1Score++;
            document.getElementById('p1-score').textContent = p1Score;
        } else {
            p2Score++;
            document.getElementById('p2-score').textContent = p2Score;
        }
    } else {
        points++;
        document.getElementById('point').textContent = points;
    }
}

let segundos = 0;
let minutos = 0;
let time;
function startTime() {
    time = setInterval(() => {
        segundos++;
        // Quando segundos chegar a 60, incrementa minutos e zera segundos
        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }
        // Formata os minutos e segundos para exibir dois dígitos (ex: 01:05)
        const formatMin = minutos.toString().padStart(2, '0');
        const formatSec = segundos.toString().padStart(2, '0');
        // Atualiza o texto do timer na tela
        document.getElementById('timer').textContent = `${formatMin}:${formatSec}`;
    }, 1000);
}

// Função para parar o cronômetro
function stopTime() {
    clearInterval(time);
}
/*criar a variável minuto, e toda vez que segundos for igual a 60, minuto++ e segundos = 0 
usar o clearinterval(testar no resetgame)*/

let resetTime=0;

const playButton = document.getElementById('play-button');
const botaoVoltar = document.querySelector('.buttonReturn');

//reseta o jogo, as cartas pontos e tempo
function resetGame(){
    firstCard = '';
    secondCard = '';
    points = 0;
    segundos = 0;
    minutos = 0;
    currentPlayer = 1;

    // Reset placar multiplayer
    p1Score = 0;
    p2Score = 0;
    const p1ScoreEl = document.getElementById('p1-score');
    const p2ScoreEl = document.getElementById('p2-score');
    if (p1ScoreEl) p1ScoreEl.textContent = '0';
    if (p2ScoreEl) p2ScoreEl.textContent = '0';

    document.getElementById('point').textContent = '0';
    document.getElementById('timer').textContent = '00:00';

    grid.innerHTML = '';

    document.getElementById('play-button').style.display = 'block';
    stopTime();
    console.log('o jogo foi reiniciado');
}

const checkCards = () => {
    //verifica se os atributos da carta são iguais
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    //Se forem iguais, acertou
    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        //Reseta a variável para que o jogador possa selecionar novas cartas
        firstCard = '';
        secondCard = '';

        sumPoints();
        checkEndGame();
    } else {
        //Vira a carta caso estejam erradas
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

            // Alterna jogador e exibe turno (Arrumar essa função)
            if (config.modo === '2') {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                const turnInfo = document.querySelector('.turn-info');
                if (turnInfo) turnInfo.textContent = `Turno: Player ${currentPlayer}`;
                checkEndGame();
            }
        }, 650);
    }
};


//Função para virar a carta
const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    //Se a carta ainda estiver vazia, aceita o clique e mostra a carta
    if(firstCard === ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    //verificar se a segunda carta está vazia, caso esteja possa clicar. Chama a função para checar se as cartas são iguais
    } else if(secondCard === ''){

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCards = (characterName, theme) => {
    //Cria uma div com a classe card, cria duas outras filhas de card
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    //De acordo com o tema, busca a imagem da carta.
    const path = theme === 'pokemon' 
     ? `../assets/pokemons/${characterName}.jpg`
     : `../assets/character/${characterName}.jpg`;

    //frente da carta
    front.style.backgroundImage = `url('${path}')`;
    //Insere as faces da carta
    card.appendChild(front);
    card.appendChild(back);
    //chama a função revealCard para virar a carta
    card.addEventListener('click', revealCard);
    //define o data-character para informar qual a carta corresponde.
    card.setAttribute('data-character', characterName);

    return card;
}

const loadGame = () => {
    const { theme, difficulty } = config;
    let numPairs = 10; // padrão: difícil
    let sizeClass = 'large'; // tamanho da carta
    let gridClass = 'hard';  // classe da grid

    if (difficulty === 'facil' || difficulty === 'fácil' || difficulty === 'easy') {
        numPairs = 4;
        sizeClass = 'small';
        gridClass = 'easy';
    } else if (difficulty === 'medio' || difficulty === 'médio' || difficulty === 'medium') {
        numPairs = 8;
        sizeClass = 'medium';
        gridClass = 'medium';
    }

    // Remove classes antigas da grid
    grid.classList.remove('easy', 'medium', 'hard');
    grid.classList.add(gridClass);

    const charactersArray = theme === 'pokemon' ? characters.pokemons : characters.hunters;
    const selected = charactersArray.sort(() => Math.random() - 0.5).slice(0, numPairs);
    const duplicateCharacters = [...selected, ...selected];
    const shuffled = duplicateCharacters.sort(() => Math.random() - 0.5);

    grid.innerHTML = ''; // limpa cartas anteriores
    
    shuffled.forEach((character) => {
        const card = createCards(character, theme);
        card.classList.add(sizeClass);
        grid.appendChild(card);
    });
}


const loadScreen = () => {
    const {theme, difficulty, modo, playerName, player2Name} = config;
    
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    let title = {
        pokemon: "Jogo da Memória - Pokemon",
        hunter: "Jogo da Memória - HxH"
    }
    let logo = {
        pokemon: '../assets/pokemonLogo.png',
        hunter: '../assets/hunterLogo.png'
    }

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `./styles/${theme}.css`;

    head.appendChild(link);

    document.querySelector('title').textContent = title[theme];
    document.querySelector('.logo').setAttribute('src',logo[theme]);

    // gerenciar placares
    if (modo === '1') {
        document.querySelector('.placar').style.display = 'block';
        document.querySelector('.placar-multiplayer').style.display = 'none';
        document.querySelector('.player').style.display = 'block';
        document.querySelector('.player').textContent = `Player: ${playerName || 'Anônimo'}`;
    } else if (modo === '2') {
        document.querySelector('.placar').style.display = 'none';
        document.querySelector('.placar-multiplayer').style.display = 'block';
        document.querySelector('.player').style.display = 'none';
        document.getElementById('player1-name').textContent = playerName || 'Player 1';
        document.getElementById('player2-name').textContent = player2Name || 'Player 2';
    }
};;
    

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    document.querySelector('.player').textContent = playerName ? playerName : 'Player: Anônimo';
    startTime();
    loadGame(); 
    if (config.modo === '2') {
        const turnInfo = document.querySelector('.turn-info');
        if (turnInfo) turnInfo.textContent = `Turno: Player ${currentPlayer}`;
    }
});

botaoVoltar.addEventListener('click', () => {
    window.location.href = '../index.html';
});


loadScreen();

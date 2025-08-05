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

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard= ''; 
let secondCard= '';


let points = 0;
function sumPoints(){
    points +=1;
    document.getElementById('point').textContent= points;
}

let segundos = 0;
let time;
function startTime(){
    time = setInterval(() => {
        segundos++;
        document.getElementById('timer').textContent= `${segundos}s`;
    },1000);
} 
/*criar a variável minuto, e toda vez que segundos for igual a 60, minuto++ e segundos = 0 
usar o clearinterval(testar no resetgame)*/

let resetTime=0;

const playButton = document.getElementById('play-button');
const botaoVoltar = document.querySelector('.buttonReturn');

function resetGame(){
    firstCard='';
    secondCard='';
    points= 0;
    segundos= 0;

    document.getElementById('point').textContent= '0';
    document.getElementById('timer').textContent= '0s';

    grid.innerHTML = '';

    document.getElementById('play-button').style.display = 'block';
    console.log('o jogo foi reiniciado');
}

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 20){
        clearInterval(time);
        alert(`Parabéns, você acertou todas as cartas em ${segundos} segundos!`)
        resetGame();
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard= '';
        secondCard= '';

        sumPoints();
        checkEndGame();

    } else {

        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard= '';
            secondCard= '';


        }, 650);
    }
}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if(secondCard === ''){

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCards = (characterName, theme) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    const path = theme === 'pokemon' 
     ? `../assets/pokemons/${characterName}.jpg`
     : `../assets/character/${characterName}.jpg`;

front.style.backgroundImage = `url('${path}')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', characterName);

    return card;
}

const loadGame = () => {
    const { theme } = config;

    const charactersArray = theme === 'pokemon' ? characters.pokemons : characters.hunters;
    
    const duplicateCharacters = [...charactersArray, ...charactersArray];
    const shuffled = duplicateCharacters.sort(() => Math.random() - 0.5);

   
    shuffled.forEach((character) => {
        const card = createCards(character, theme);
        grid.appendChild(card);
    });
}

const loadScreen = () => {
    const {theme, difficulty, modo, playerName} = config;
    
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
        document.getElementById('player2-name').textContent = 'P2';
    }
};
    

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    document.querySelector('.player').textContent = playerName ? playerName : 'Player: Anônimo';
    startTime();
    loadGame(); 
});

botaoVoltar.addEventListener('click', () => {
    window.location.href = '../index.html';
});


loadScreen()


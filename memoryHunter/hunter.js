/*const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');

const playerName = localStorage.getItem('player');

if (playerName) {
    spanPlayer.textContent = `Player: ${playerName}`;
} else {
    spanPlayer.textContent = 'Player: Anônimo';
}

const character= [
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

let resetTime=0;

const playButton = document.getElementById('play-button');
const botaoVoltar = document.querySelector('.buttonReturn');

function resetGame(){
    firstCard= '';
    secondCard= '';
    points= 0;
    segundos= 0;

    document.getElementById('point').textContent= '0';
    document.getElementById('timer').textContent= '0s';

    grid.innerHTML = '';

    document.getElementById('play-button').style.display = 'block';
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

const createCards = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../assets/character/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacter = [...character, ...character];

    const embaralhar = duplicateCharacter.sort( () => Math.random() - 0.5 );

    embaralhar.forEach((character)=> {
        const card = createCards(character);
        grid.appendChild(card);

    });

}

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    startTime();
    loadGame(); 
});

botaoVoltar.addEventListener('click', () => {
    window.location.href = '../index.html';
});
*/
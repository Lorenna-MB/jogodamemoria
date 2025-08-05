const input = document.querySelector('.login-input');
const buttonPokemon = document.querySelector('.loginPokemon');
const buttonHxh = document.querySelector('.loginHxh');
const form = document.querySelector('.login-form');
const openModalButton = document.querySelector('.open-modal');
const buttonPlayer1 = document.querySelector('.Player1');
const buttonPlayer2 = document.querySelector('.Player2');
const dificuldadeButtons = document.querySelectorAll('.dificuldade');

let gameConfig = {
    playerName: '',
    theme: '',
    modo: '',
    difficulty: '',
};

const validateInput = ({ target }) => {
    const isValid = target.value.length > 1 && target.value.length <= 15;

    gameConfig.playerName = target.value;

    buttonHxh.disabled = !isValid;
    buttonPokemon.disabled = !isValid;
    openModalButton.disabled = !isValid;

};

const handleClick = (destination) => {
    localStorage.setItem('config', JSON.stringify(gameConfig));
    window.location = destination;
};

input.addEventListener('input', validateInput);

dificuldadeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const dificuldadeSelecionada = button.getAttribute('data-dif');
        gameConfig.difficulty = dificuldadeSelecionada;

        console.log('Dificuldade salva:', gameConfig.difficulty);
    });
});

buttonPokemon.addEventListener('click', () => {
    gameConfig.theme = 'pokemon';
    localStorage.setItem('config', JSON.stringify(gameConfig));
    window.location = './games'; 
});

buttonHxh.addEventListener('click', () => {
    gameConfig.theme = 'hunter';
    localStorage.setItem('config', JSON.stringify(gameConfig));
    window.location = './games';
});

const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
        modal.close();
    });
});

buttonPlayer1.addEventListener('click', () => {
    gameConfig.modo = '1';
    console.log('Modo de jogo: 1 jogador');
});

buttonPlayer2.addEventListener('click', () => {
    gameConfig.modo = '2';
    console.log('Modo de jogo: 2 jogadores');
});


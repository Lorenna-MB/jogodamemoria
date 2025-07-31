const input = document.querySelector('.login-input');
const buttonPokemon = document.querySelector('.loginPokemon');
const buttonHxh = document.querySelector('.loginHxh');
const form = document.querySelector('.login-form');
const openModalButton = document.querySelector('.open-modal');

let gameConfig = {
    playerName: '',
    theme: '',
    modo: '',
    difficulty: '',
};

const validateInput = ({ target }) => {
    const isValid = target.value.length > 1 && target.value.length <= 15;

    buttonHxh.disabled = !isValid;
    buttonPokemon.disabled = !isValid;
    openModalButton.disabled = !isValid;
};

const handleClick = (destination) => {
    localStorage.setItem('config', JSON.stringify(gameConfig));
    window.location = destination;
};

input.addEventListener('input', validateInput);


buttonPokemon.addEventListener('click', () => {
    gameConfig.theme= 'pokemon';
    handleClick('./games'); 
});

buttonHxh.addEventListener('click', () => {
    gameConfig.theme= 'hunter';
    handleClick('./games')
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
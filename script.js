const input = document.querySelector('.login-input');
const buttonPokemon = document.querySelector('.loginPokemon');
const buttonHxh = document.querySelector('.loginHxh');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    const isValid = target.value.length > 1 && target.value.length <= 15;

    buttonHxh.disabled = !isValid;
    buttonPokemon.disabled = !isValid;
};

const handleClick = (destination) => {
    localStorage.setItem('player', input.value);
    window.location = destination;
};

input.addEventListener('input', validateInput);

buttonPokemon.addEventListener('click', () => {
    handleClick('./memoryPokemon/pokemon.html'); 
});

buttonHxh.addEventListener('click', () => {
    handleClick('./memoryHunter/hunter.html');
});

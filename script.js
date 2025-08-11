const input = document.querySelector('.login-input');
const buttonPokemon = document.querySelector('.loginPokemon');
const buttonHxh = document.querySelector('.loginHxh');
const form = document.querySelector('.login-form');
const openModalButton = document.querySelector('.open-modal');
const buttonPlayer1 = document.querySelector('.Player1');
const buttonPlayer2 = document.querySelector('.Player2');
const dificuldadeButtons = document.querySelectorAll('.dificuldade');


//Para salvar as configurações feitas
let gameConfig = {
    playerName: '',
    theme: '',
    modo: '',
    difficulty: '',
};

//Validação de nick
const validateInput = ({ target }) => {
  const isValid = target.value.length > 1 && target.value.length <= 15;

    gameConfig.playerName = target.value;
//Habilitar os botões
    buttonHxh.disabled = !isValid;
    buttonPokemon.disabled = !isValid;
    openModalButton.disabled = !isValid;

};
//Redirecionar para a página
const handleClick = (destination) => {
    localStorage.setItem('config', JSON.stringify(gameConfig));
    window.location = destination;
};

//Validar se todos os itens estão preenchidos
input.addEventListener('input', validateInput);

const validateBeforeStart = () => {
    if (
        gameConfig.playerName &&
        gameConfig.theme &&
        gameConfig.modo &&
        gameConfig.difficulty
    ) {
        localStorage.setItem('config', JSON.stringify(gameConfig));
        window.location = './games';
    } else {
        alert('Por favor, preencha todas as opções:\n- Quantidade de jogadores \n- Dificuldade \n- Tema');
    }
};

buttonPokemon.addEventListener('click', (event) => {
    event.preventDefault(); //Impede redirecionamento automático
    gameConfig.theme = 'pokemon';
    validateBeforeStart();
});

buttonHxh.addEventListener('click', (event) => {
    event.preventDefault(); // 🚫 Impede redirecionamento automático
    gameConfig.theme = 'hunter';
    validateBeforeStart();
});

//forEach para percorrer todos os botões o data-dif obtém o valor do atributo clicado.
dificuldadeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const dificuldadeSelecionada = button.getAttribute('data-dif');
        if (dificuldadeSelecionada) {
            gameConfig.difficulty = dificuldadeSelecionada;

            //Garante que só um tenha o estilo, único clicado por vez
            dificuldadeButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
        }
    });
});

//Para clicar o botão e abrir o modal e adiciona um evente de clique para cada botão dentro do modal
const openButtons = document.querySelectorAll('.open-modal');
    openButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modalId = button.getAttribute('data-modal'); //lê o atributo clicado
        const modal = document.getElementById(modalId);    //Esse valor representa qual id do modal deve ser aberto
        modal.classList.add('active'); //Ativar estilos do css
        modal.showModal();
    });
});

//fechar modal
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
    buttonPlayer1.classList.add('selected');
    buttonPlayer2.classList.remove('selected'); //garante que só um botão seja estilizado de acordo com o click
});

buttonPlayer2.addEventListener('click', () => {
    gameConfig.modo = '2';
    buttonPlayer2.classList.add('selected');
    buttonPlayer1.classList.remove('selected');
});


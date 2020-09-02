function initialize() {
    addCollapse();
    addMenuList();
    carregaExerciciosUnit(1);
}

function limpaHome() {
    let home = document.getElementById('idHome');
    home.innerHTML = '';
}

function addCollapse() {
    let width = window.innerWidth;
    let menuListClasse = document.getElementById('idMenuLateral').classList;
    const classCollapse = 'collapse';
    if (width <= 700) {
        menuListClasse.add(classCollapse);
    } else if (width > 700 && menuListClasse.contains(classCollapse)) {
        menuListClasse.remove(classCollapse);
    }
}

function addMenuList() {
    let idMenuLateral = document.getElementById('idMenuLateral');
    UnitController.addMenuList((listUnit) => {
        qtdUnit = listUnit.length;
        listUnit.forEach(itemMenu => {
            idMenuLateral.innerHTML += itemMenu;
        });
        removeAcaoLink(qtdUnit);
    }, 1);
}

function removeAcaoLink(qtdUnit) {
    for (let i = 1; i < qtdUnit; i++) {
        let itemMenu = document.getElementById(`idUnitMenu${i}`);
        itemMenu.addEventListener('click', function (e) {
            e.preventDefault()
            itemMenuClicado(i, qtdUnit - 1);
        })
    }
}

function itemMenuClicado(idUnit, qtdTotal) {
    const classSelecionado = 'selecionado';
    for (let i = 1; i < qtdTotal; i++) {
        let itemMenu = document.getElementById(`idUnitMenu${i}`);
        if (i == idUnit && !itemMenu.classList.contains(classSelecionado)) {
            itemMenu.classList.add(classSelecionado);
        } else {
            itemMenu.classList.remove(classSelecionado);
        }
    }
    limpaHome();
    carregaExerciciosUnit(idUnit);
}

function carregaExerciciosUnit(idUnit) {
    let idHome = document.getElementById('idHome');
    idHome.innerHTML = ExerciseController.addUnitNome(idUnit);
    removeAcaoLinkHome(idUnit);

    let divExercicios = document.createElement('div', 'exercicios');
    divExercicios.setAttribute('id', 'exercicios');
    idHome.appendChild(divExercicios);

    let idHomeExercicios = idHome.querySelector('#exercicios');

    let listExercises = ExerciseController.addExerciseCards(idUnit);
    listExercises.forEach(exercise => idHomeExercicios.innerHTML += exercise);

    let exercises = ExerciseController.getExercisesByIdUnit(idUnit);
    exercises.forEach(exercise => {
        if (!exercise.bloqueado) {
            let cardExercise = document.getElementById(`idCardExercise${exercise.id}`);
            cardExercise.addEventListener('click', function (e) {
                e.preventDefault();
                limpaHome();
                itemExercicioClicado(idUnit, exercise.id);
            })
        }
    })
}

function removeAcaoLinkHome(idUnit) {
    let nomeHomeUnit = document.getElementById(`idHomeUnit${idUnit}`);
    nomeHomeUnit.addEventListener('click', function (e) {
        e.preventDefault();
        limpaHome();
        carregaExerciciosUnit(idUnit);
    })
}

function itemExercicioClicado(idUnit, idExercise) {
    let idHome = document.getElementById('idHome');
    idHome.innerHTML = ExerciseController.addUnitNome(idUnit);
    idHome.innerHTML += ExerciseController.addExerciseNome(idExercise);

    removeAcaoLinkHome(idUnit);

    let divQuestions = document.createElement('div', 'questoes');
    divQuestions.setAttribute('id', 'questoes');
    idHome.appendChild(divQuestions);

    let idHomeQuestions = idHome.querySelector('#questoes');
    let questions = QuestionsController.addQuestions(idExercise);
    questions.forEach(question => {
        idHomeQuestions.innerHTML += question;
    })
}

function speechToText(idQuestion) {
    let micIcon = document.getElementById(`idMic${idQuestion}`);
    micIcon.style.color = "red";

    let cardQuestion = document.getElementById(`idCardQuestion${idQuestion}`);
    let possuiTextoFalado = false;

    cardQuestion.childNodes.forEach(node => {
        possuiTextoFalado = node.id == "texto-falado" ? true : possuiTextoFalado;
    });

    if (!possuiTextoFalado) {
        QuestionsController.addTextoFalado(idQuestion);
    }

    let cardQuestionText = document.getElementById(`idCardQuestionText${idQuestion}`);
    let textoQuestao = cardQuestionText.childNodes[0].textContent;
    let pTextoFalado = document.getElementById(`idTextoFalado${idQuestion}`);
    pTextoFalado.style.color = "black";
    startRecognition(textoQuestao, pTextoFalado, micIcon, idQuestion);
}

function startRecognition(textoQuestao, pTextoFalado, micIcon, idQuestion) {
    let textoFalado;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.start()
    recognition.addEventListener('result', e => {
        textoFalado = e.results[0][0].transcript;
        pTextoFalado.innerHTML = `${textoFalado}`;
    })
    recognition.addEventListener('end', e => {
        let novoTexto = formataTexto(textoQuestao, textoFalado);
        pTextoFalado.innerHTML = `${novoTexto}`;
        let porcentagemAcerto = Math.round(calculaAcerto(textoQuestao, novoTexto));
        if (porcentagemAcerto >= 80) {
            pTextoFalado.style.color = "green";
        } else if (porcentagemAcerto >= 50 ){
            pTextoFalado.style.color = "orange";
        } else {
            pTextoFalado.style.color = "red";
        }
        let scoreQuestion = document.getElementById(`idScoreQuestion${idQuestion}`);
        scoreQuestion.innerHTML = `${porcentagemAcerto}%`;
        micIcon.style.color = "#999a9b";
    })
}

function formataTexto(textoOriginal, textoFalado) {
    let textoOriginalFormatado = textoOriginal.split('');
    let textoFaladoFormatado = textoFalado.split('');

    for (let i = 0; i < textoOriginalFormatado.length; i++) {

        if (i < textoFaladoFormatado.length) {
            if ((textoOriginalFormatado[i].charCodeAt(0) + 32) == textoFaladoFormatado[i].charCodeAt(0)) {
                textoFaladoFormatado[i] = textoOriginalFormatado[i];
            }
        }
        if (textoOriginalFormatado[i] != textoFaladoFormatado[i]) {
            if (textoFaladoFormatado[i - 1] == textoOriginalFormatado[i - 1] && textoOriginal.charCodeAt(i) >= 33 && textoOriginal.charCodeAt(i) <= 63) {
                textoFaladoFormatado[i] = textoFaladoFormatado[i] == undefined ? `${textoOriginalFormatado[i]}` : textoOriginalFormatado[i] + textoFaladoFormatado[i];
                textoFaladoFormatado = textoFaladoFormatado.join('').split('');
            }
        }
    }
    return `${textoFaladoFormatado.join('')}`;
}

function calculaAcerto(textoQuestao, textoFalado){
    let textoQuestaoArray = textoQuestao.split(' ');
    let textoFaladoFormatadoArray = textoFalado.split(' ');
    let qtdAcertos = 0;

    for(let i = 0; i < textoQuestaoArray.length; i++){
        if(textoQuestaoArray[i] == textoFaladoFormatadoArray[i]){
            qtdAcertos = qtdAcertos + 1;
        }
    }

    return (qtdAcertos * 100) / (textoQuestaoArray.length);
}

function escondeMenuMobile() {
    let width = window.innerWidth;
    if (width <= 700) {
        let btnMenuLateral = document.getElementById('btnMenuLateralMobile');
        btnMenuLateral.click();
    }
}
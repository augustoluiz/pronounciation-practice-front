let global_user = {
    id: null,
    token: null,
    login: null,
    password: null
}
let global_token

function validaLogin(event){
    event.preventDefault();
    console.log(global_user)
    global_user.login = event.target.inputEmail.value;
    global_user.password = event.target.inputPassword.value;

    console.log(global_user)

    RequestLayout.TOKEN("http://localhost:8080/oauth/token", global_user.login, global_user.password, (xhr) => {
        if(xhr.status == 200){
            global_token = JSON.parse(xhr.responseText).access_token

            //event.action = "home.html"
            let data = new Date();

            //setando o tempo de vida do cookie
            data.setTime(data.getTime() + 60000)

            //criando o cookie
            document.cookie = `token= ${global_token}; SameSite=None; Secure`;
            capturaUserId();
 
        } else {
            event.action = "index.html"
        } 
    })
    
}

function capturaUserId(){
    RequestLayout.GETID(`http://localhost:8080/v1/usuario/findIdByLoginSenha/?usuarioLogin=${global_user.login}&usuarioSenha=${global_user.password}`, (id) => {
        
        global_user.id = id;
        document.cookie=`user_id= ${global_user.id}; SameSite=None; Secure`;

        let linkHome = document.createElement("a");
        linkHome.setAttribute("href", "home.html");
        document.body.appendChild(linkHome);
        linkHome.click();

    }, global_user.login, global_user.password, global_token)
}

function logOut(){
    let linklogin = document.createElement("a");
    linklogin.setAttribute("href", "index.html");
    document.body.appendChild(linklogin);
    linklogin.click();
}

function initialize() {
    console.log("Nova Pág"+document.cookie)
//    RequestLayout.TOKEN("http://localhost:8080/oauth/token", global_user.login, global_user.password, (token) => {
//        global_token = token.access_token
        global_user.id = document.cookie.split(";")[1].split("=")[1];
        global_user.token = document.cookie.split(";")[0].split("=")[1];
        console.table(global_user)
        addCollapse();
        addMenuList(global_user.token);
        carregaExerciciosUnit(1, global_user.token);
//    })

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

function addMenuList(token) {
    let idMenuLateral = document.getElementById('idMenuLateral');
    UnitController.addMenuList((listUnit) => {
        qtdUnit = listUnit.length;
        listUnit.forEach(itemMenu => {
            idMenuLateral.innerHTML += itemMenu;
        });
        removeAcaoLink(qtdUnit, token);
    }, global_user.id, token);
}

function removeAcaoLink(qtdUnit, token) {
    for (let i = 1; i < qtdUnit; i++) {
        let itemMenu = document.getElementById(`idUnitMenu${i}`);
        itemMenu.addEventListener('click', function (e) {
            e.preventDefault()
            itemMenuClicado(i, qtdUnit - 1, token);
        })
    }
}

function itemMenuClicado(idUnit, qtdTotal, token) {
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
    carregaExerciciosUnit(idUnit, token);
}

function carregaExerciciosUnit(idUnit, token) {
    ExerciseController.addUnitNome((nome) => {
        let idHome = document.getElementById('idHome');
        idHome.innerHTML = ExerciseView.montaNomeUnit(nome.nome, idUnit);
        removeAcaoLinkHome(idUnit, token);

        let divExercicios = document.createElement('div', 'exercicios');
        divExercicios.setAttribute('id', 'exercicios');
        idHome.appendChild(divExercicios);
        
    }, idUnit, token, global_user.id)
    ExerciseController.addExerciseCards((exercises)=>{
        //Add ExerciseController.getQtdQuestions
        //Add ExerciseController.getQtdQuestionsOk
        ExerciseView.montaExercises(exercises).forEach(exerciseHTML => {
            let idHomeExercicios = idHome.querySelector('#exercicios');
            idHomeExercicios.innerHTML += exerciseHTML
        });
    }, idUnit, token, global_user.id);
    ExerciseController.getExercisesByIdUnit((exercises) => {
        exercises.forEach(exercise => {
            if (!exercise.bloqueado) {
                let cardExercise = document.getElementById(`idCardExercise${exercise.id}`);
                cardExercise.addEventListener('click', function (e) {
                    e.preventDefault();
                    limpaHome();
                    itemExercicioClicado(idUnit, exercise.id, token);
                })
            }
        });
    }, idUnit, token, global_user.id);
}

function removeAcaoLinkHome(idUnit, token) {
    let nomeHomeUnit = document.getElementById(`idHomeUnit${idUnit}`);
    nomeHomeUnit.addEventListener('click', function (e) {
        e.preventDefault();
        limpaHome();
        carregaExerciciosUnit(idUnit, token);
    })
}

function itemExercicioClicado(idUnit, idExercise, token) {
    let idHome = document.getElementById('idHome');
    ExerciseController.addUnitNome((nome) => {
        let idHome = document.getElementById('idHome');
        idHome.innerHTML = ExerciseView.montaNomeUnit(nome.nome, idUnit);
        removeAcaoLinkHome(idUnit, token);

        let divExercicios = document.createElement('div', 'exercicios');
        divExercicios.setAttribute('id', 'exercicios');
        idHome.appendChild(divExercicios);
        let divQuestions = document.createElement('div', 'questoes');
        divQuestions.setAttribute('id', 'questoes');
        idHome.appendChild(divQuestions);

        let idHomeQuestions = idHome.querySelector('#questoes');
        QuestionsController.addQuestions((questions) => {
                questions.forEach(question => {
                idHomeQuestions.innerHTML += question;
            })
        }, idExercise, token, global_user.id)
    }, idUnit, token, global_user.id)
    //idHome.innerHTML += ExerciseController.addExerciseNome(idExercise);
    //removeAcaoLinkHome(idUnit);

    
    //let questions = QuestionsController.addQuestions(idExercise);
    
}

function speechToText(idQuestion) {
    console.log(global_token)
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
        } else if (porcentagemAcerto >= 50) {
            pTextoFalado.style.color = "orange";
        } else {
            pTextoFalado.style.color = "red";
        }
        let scoreQuestion = document.getElementById(`idScoreQuestion${idQuestion}`);
        scoreQuestion.innerHTML = `${porcentagemAcerto}%`;
        micIcon.style.color = "#999a9b";
        RequestLayout.POST("http://localhost:8080/v1/usuario-questao", {
            usuarioId: global_user.id,
            questaoId: idQuestion,
            pontuacao: porcentagemAcerto,
            dataAtualizacao: "2020-08-29T00:00:00"
        }, global_token)
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

function calculaAcerto(textoQuestao, textoFalado) {
    let textoQuestaoArray = textoQuestao.split(' ');
    let textoFaladoFormatadoArray = textoFalado.split(' ');
    let qtdAcertos = 0;

    for (let i = 0; i < textoQuestaoArray.length; i++) {
        if (textoQuestaoArray[i] == textoFaladoFormatadoArray[i]) {
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
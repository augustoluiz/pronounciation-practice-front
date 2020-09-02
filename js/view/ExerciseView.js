class ExerciseView{
    static montaNomeUnit(nomeUnit, idUnit){
        return `<div class="home-unit-nome" id="idHomeUnit${idUnit}"><a href="">${nomeUnit}</a></div>`;
    }
    static montaExercises(listExercises){
        return listExercises.map(exercise => {
            let html = `<div class="card border-light" id="idCardExercise${exercise.id}">`+
                          `<div class="card-header">${exercise.titulo}</div>`+
                             `<div class="card-body">`+
                                `<div id="exercicios-qtd-questoes">`;
            if(!exercise.bloqueado){
                let qtdQuestions = new UserQuestionsData().getQtdQuestionsByExerciseId(exercise.id);
                let qtdQuestionsOk = new UserQuestionsData().getQtdQuestionsOkByExerciseId(exercise.id);
                let progresso = (qtdQuestionsOk * 100) / qtdQuestions;
                html += `<h1>${qtdQuestionsOk}/${qtdQuestions}</h1>`+
                        `<h2>questions</h2>`+
                        `</div>`;
                html += `<div class="barra-progresso">`+
                            `<div class="progress" style="height: 5px;">`+
                                `<div class="progress-bar" role="progressbar" aria-valuenow="${progresso}" aria-valuemin="0" aria-valuemax="100" style="width:${progresso}%;"></div>`+
                            `</div>`+
                        `</div>`
            } else {
                html += `<a class="lock">`+
                         `<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                         <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" /></svg>`+
                        `</a>`+
                        `</div>`;
            }
            return html += `</div></div>`;
        })
    }
    
    static montaNomeExercise(nomeExercise){
        return `<p>${nomeExercise}</p>`;
    }
}
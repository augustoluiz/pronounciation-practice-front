class QuestionView {
    static montaQuestions(listQuestions) {
        let i = 0;
        listQuestions.map(question => {
            question.index = i;
            i++;
        })  
        return listQuestions.map(question => {
            let html = `<div class="card" id="idCardQuestion${question.id}">` +
                `<div class="card-body">` +
                `<div class="card-text" id="idCardQuestionText${question.id}">` +
                `<p>${question.texto}</p></div>` +
                `<div class="score-icons">`;
            ///if (!question.bloqueado) {
                html += `<div class="score-icon-item">` +
                    `<p class="score" id="idScoreQuestion${question.id}">${question.stauts} %</p>` +
                    `</div>` +
                    `<div class="score-icon-item">` +
                    `<a class="mic" id="idMic${question.id}" onclick="speechToText(${question.id})">` +
                    `<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-mic-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                    <path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                                </svg>`+
                    `</a>` +
                    `</div>` +
                    `</div>` +
                    `</div>`;
                if (question.audios.length > 0) {
                    html += `<div class="card-body btn-video">
                                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#idVideoQuestao${question.id}" aria-expanded="false" aria-controls="idVideoQuestao${question.id}">Conteúdo Adicional</button>
                            </div>
                            <div class="collapse" id="idVideoQuestao${question.id}">
                                <div class="card-body video-questao">
                                ${this.montaAudiosuestao(question.audios)}
                                </div>
                            </div>`;
                }
            /*bloqueado
            } else {
                html += `<a class="lock">` +
                    `<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">` +
                    `<path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />` +
                    `<path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />` +
                    `</svg>` +
                    `</a></div></div>`;
            }*/
            return html;
        })
    }

    static montaAudiosuestao(listAudioLink) {
        let listAudioLinkFormatado = listAudioLink.map(linkAudio => {
            return `<div>
                        <iframe width="560" height="315" src="${linkAudio.link}" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </div>`;
        });
        return listAudioLinkFormatado.reduce((anterior, atual) => atual = `${anterior}${atual}`);
    }

    static montaTextoFalado(idQuestion) {
        let cardQuestion = document.getElementById(`idCardQuestion${idQuestion}`);
        let divTextoFalado = document.createElement('div');
        divTextoFalado.setAttribute('class', 'card-body');
        divTextoFalado.setAttribute('id', 'texto-falado');

        let divCardTextTextoFalado = document.createElement('div');
        divCardTextTextoFalado.setAttribute('class', 'card-text');

        let pTextoFalado = document.createElement('p');
        pTextoFalado.setAttribute('id', `idTextoFalado${idQuestion}`);

        divCardTextTextoFalado.insertChildAtIndex(pTextoFalado, 0);

        divTextoFalado.insertChildAtIndex(divCardTextTextoFalado, 0);
        cardQuestion.insertChildAtIndex(divTextoFalado, 1);
    }
}
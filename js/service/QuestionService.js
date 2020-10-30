const rotas_question = {
    "lista_question_por_exerciseId" : `https://pronounciation-practice.herokuapp.com/v1/questao/exercicio/`,
    "qtd_questoes_por_exerciseId" : `https://pronounciation-practice.herokuapp.com/v1/exercicio/totalQuestaoById/`,
    "qtd_questoes_ok_por_exerciseId" : `https://pronounciation-practice.herokuapp.com/v1/exercicio/totalQuestaoCertaById/`
};

class QuestionService {
    constructor(){}

    static getDadosByIdExercise(cb, exerciseId, token, usuarioId){
        RequestLayout.GET(`${rotas_question.lista_question_por_exerciseId}${exerciseId}?usuarioId=${usuarioId}`, cb, token, usuarioId);
    }

    static getQtdQuestionsByExerciseId(cb, exerciseId, token, usuarioId){
        RequestLayout.GET(`${rotas_question.qtd_questoes_por_exerciseId}${exerciseId}`, cb, token, usuarioId);
    }

    static getQtdQuestionsOkByExerciseId(cb, exerciseId, token, usuarioId){
        RequestLayout.GET(`${rotas_question.qtd_questoes_ok_por_exerciseId}${exerciseId}/${usuarioId}`, cb, token, usuarioId);
    }
    
}
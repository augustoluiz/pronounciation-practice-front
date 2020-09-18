const rotas_question = {
    "lista_question_por_exerciseId" : `http://localhost:8080/v1/questao/exercicio/`
};

class QuestionService {
    constructor(){}

    static getDadosByIdExercise(cb, exerciseId){
        RequestLayout.GET(`${rotas_question.lista_question_por_exerciseId}${exerciseId}`, cb);
    }
}
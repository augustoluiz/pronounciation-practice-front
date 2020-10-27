class QuestionsController{
    static addQuestions(cb, idExercise, token, usuarioId){
        new UserQuestionsData().getQuestionsByExerciseId((questions) => {
            cb(QuestionView.montaQuestions(questions, token))
        },  idExercise, token, usuarioId);
        //let listQuestions = new UserQuestionsData().getQuestionsByExerciseId(cb, idExercise);
        //return QuestionView.montaQuestions(listQuestions);
    }

    static addTextoFalado(idQuestion){
        QuestionView.montaTextoFalado(idQuestion);
    }

    static getQtdQuestionsByExerciseId(cb, exerciseId){
        
    }

    static getQtdQuestionsOkByExerciseId(cb, exerciseId, userId){

    }
}
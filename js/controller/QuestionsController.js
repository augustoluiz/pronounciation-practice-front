class QuestionsController{
    static addQuestions(idExercise){
        let listQuestions = new UserQuestionsData().getQuestionsByExerciseId(idExercise);
        return QuestionView.montaQuestions(listQuestions);
    }

    static addTextoFalado(idQuestion){
        QuestionView.montaTextoFalado(idQuestion);
    }
}
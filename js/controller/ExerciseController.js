class ExerciseController{
    static addUnitNome(cb, idUnit, token, usuarioId){
        new UnitData().getNomeById((nome) => {
            cb(nome)
        }, idUnit, token, usuarioId)
    }
    static addExerciseCards(cb, idUnit, token, usuarioId){
        this.getExercisesByIdUnit(cb, idUnit, token, usuarioId);
    }
    static getExercisesByIdUnit(cb, idUnit, token, usuarioId){
        new ExerciseData().getDadosByIdUnit((exercises) =>{
            cb(exercises);
        }, idUnit, token, usuarioId);
    }
    static addExerciseNome(idExercise, token, usuarioId){
        let nomeExercise = new ExerciseData().getNomeById(idExercise, token, usuarioId);
        return ExerciseView.montaNomeExercise(nomeExercise);
    }
}
class ExerciseController{
    static async addUnitNome(cb, idUnit, token, usuarioId){
        new UnitData().getNomeById((nome) => {
            cb(nome)
        }, idUnit, token, usuarioId)
    }
    static async addExerciseCards(cb, idUnit, token, usuarioId){
        this.getExercisesByIdUnit(cb, idUnit, token, usuarioId);
    }
    static async getExercisesByIdUnit(cb, idUnit, token, usuarioId){
        new ExerciseData().getDadosByIdUnit((exercises) =>{
            cb(exercises);
        }, idUnit, token, usuarioId);
    }
    static async addExerciseNome(idExercise, token, usuarioId){
        let nomeExercise = new ExerciseData().getNomeById(idExercise, token, usuarioId);
        return ExerciseView.montaNomeExercise(nomeExercise);
    }
}
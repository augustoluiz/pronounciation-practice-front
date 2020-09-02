class ExerciseController{
    static addUnitNome(idUnit){
        let nomeUnit = new UnitData().getNomeById(idUnit);
        return ExerciseView.montaNomeUnit(nomeUnit, idUnit);
    }
    static addExerciseCards(idUnit){
        return ExerciseView.montaExercises(this.getExercisesByIdUnit(idUnit));
    }
    static getExercisesByIdUnit(idUnit){
        return new ExerciseData().getDadosByIdUnit(idUnit);
    }
    static addExerciseNome(idExercise){
        let nomeExercise = new ExerciseData().getNomeById(idExercise);
        return ExerciseView.montaNomeExercise(nomeExercise);
    }
}
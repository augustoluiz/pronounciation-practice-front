class ExerciseController{
    static addUnitNome(idUnit){
        let nomeUnit = new UnitData().getNomeById(idUnit);
        return ExerciseView.montaNomeUnit(nomeUnit, idUnit);
    }
    static addExerciseCards(cb, idUnit){
        //return ExerciseView.montaExercises(new ExerciseData().getDadosByIdUnit1(idUnit));
        this.getExercisesByIdUnit(cb, idUnit);
        //ExerciseView.montaExercises(this.);
        //return ExerciseView.montaExercises(this.getExercisesByIdUnit(idUnit));
    }
    static getExercisesByIdUnit(cb, idUnit){
        new ExerciseData().getDadosByIdUnit((exercises) =>{
            cb(exercises);
        }, idUnit);
    }
    static addExerciseNome(idExercise){
        let nomeExercise = new ExerciseData().getNomeById(idExercise);
        return ExerciseView.montaNomeExercise(nomeExercise);
    }
}
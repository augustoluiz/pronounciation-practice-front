let dataExercise = [{
    "id": 1,
    "titulo": "Exercise 1",
    "qtdQuestions": 21,
    "idUnit": 1,
    "bloqueado": false
}, {
    "id": 2,
    "titulo": "Exercise 2",
    "qtdQuestions": 15,
    "idUnit": 1,
    "bloqueado": true
}, {
    "id": 3,
    "titulo": "Exercise 3",
    "qtdQuestions": 20,
    "idUnit": 1,
    "bloqueado": true
}, {
    "id": 4,
    "titulo": "Exercise 4",
    "qtdQuestions": 10,
    "idUnit": 1,
    "bloqueado": true
},{
    "id": 5,
    "titulo": "Exercise 1",
    "qtdQuestions": 21,
    "idUnit": 2,
    "bloqueado": true
}, {
    "id": 6,
    "titulo": "Exercise 2",
    "qtdQuestions": 15,
    "idUnit": 2,
    "bloqueado": true
}, {
    "id": 7,
    "titulo": "Exercise 3",
    "qtdQuestions": 20,
    "idUnit": 2,
    "bloqueado": true
}, {
    "id": 8,
    "titulo": "Exercise 4",
    "qtdQuestions": 10,
    "idUnit": 2,
    "bloqueado": true
}, {
    "id": 9,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 3,
    "bloqueado": true
}, {
    "id": 10,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 4,
    "bloqueado": true
}, {
    "id": 11,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 5,
    "bloqueado": true
}, {
    "id": 12,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 6,
    "bloqueado": true
}, {
    "id": 13,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 7,
    "bloqueado": true
}, {
    "id": 14,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 8,
    "bloqueado": true
}, {
    "id": 15,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 9,
    "bloqueado": true
}, {
    "id": 16,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 10,
    "bloqueado": true
}, {
    "id": 17,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 11,
    "bloqueado": true
}, {
    "id": 18,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 12,
    "bloqueado": true
}, {
    "id": 19,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 13,
    "bloqueado": true
}, {
    "id": 20,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 14,
    "bloqueado": true
}, {
    "id": 21,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 15,
    "bloqueado": true
}, {
    "id": 22,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 16,
    "bloqueado": true
}, {
    "id": 23,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 17,
    "bloqueado": true
}, {
    "id": 24,
    "titulo": "Exercise 1",
    "qtdQuestions": 10,
    "idUnit": 18,
    "bloqueado": true
}];
class ExerciseData {

    constructor() { }

    getDados() {
        return dataExercise;
    }

    getDadosByIdUnit(cb, idUnit) {
        return ExerciseService.getDadosByIdUnit(cb, idUnit);
        //return dataExercise.filter(exercise => exercise.idUnit == idUnit);
    }

    getDadosByIdUnit1(idUnit) {
        //return ExerciseService.getDadosByIdUnit(cb, idUnit);
        return dataExercise.filter(exercise => exercise.idUnit == idUnit);
    }

    getNomeById(idExercise){
        return dataExercise.filter(exercise => exercise.id == idExercise)[0].titulo;
    }
}
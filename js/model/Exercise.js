class Exercise{

    constructor(idExercise, nome, status, idUnit){
        this.idExercise = idExercise;
        this.nome = nome;
        this.status = status;
        this.idUnit = idUnit;
    }

    getIdExercise(){
        return this.idExercise;
    }

    setIdExercise(idExercise){
        this.idExercise = idExercise;
    }

    getNome(){
        return this.nome;
    }

    setNome(nome){
        this.nome = nome;
    }

    getStatus(){
        return this.status;
    }

    setStatus(status){
        this.status = status;
    }

    getIdUnit(){
        return this.idUnit;
    }

    setIdUnit(idUnit){
        this.idUnit = idUnit;
    }

    toString(){
        return `exercise = {id = ${this.idExercise}, nome = ${this.nome}, status = ${this.status}, idUnit = ${this.idUnit}}`
    }

}
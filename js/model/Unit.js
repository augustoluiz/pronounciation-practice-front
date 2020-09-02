class Unit {

    constructor(idUnit, nome, status, exercises) {
        this.idUnit = idUnit;
        this.nome = nome;
        this.status = status;
        this.exercises = exercises;
    }

    getIdUnit() {
        return this.idUnit;
    }

    setIdUnit(idUnit) {
        this.idUnit = idUnit;
    }

    getNome() {
        return this.nome;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getExercises(){
        return this.exercises;
    }

    setExercises(exercises){
        this.exercises = exercises;
    }

    toString() {
        return `unit = {id = ${this.idUnit}, ` +
                       `nome = "${this.nome}", ` +
                       `status = ${this.status},`+
                       `exercises = ${this.exercises}}`
    }

}
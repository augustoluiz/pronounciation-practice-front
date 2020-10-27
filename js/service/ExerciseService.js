const rotas_exercise = {
    "lista_exercicios_por_id" : `http://localhost:8080/v1/exercicio/unidade/`
};

class ExerciseService {
    constructor(){}

    static getDadosByIdUnit(cb, unitId, token, usuarioId){
        RequestLayout.GET(`${rotas_exercise.lista_exercicios_por_id}${unitId}?usuarioId=${usuarioId}`, cb, token, usuarioId);
    }
}
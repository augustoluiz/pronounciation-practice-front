const rotas_exercise = {
    "lista_exercicios_por_id" : `https://pronounciation-practice.herokuapp.com/v1/exercicio/unidade/`
};

class ExerciseService {
    constructor(){}

    static getDadosByIdUnit(cb, unitId, token, usuarioId){
        RequestLayout.GET(`${rotas_exercise.lista_exercicios_por_id}${unitId}?usuarioId=${usuarioId}`, cb, token, usuarioId);
    }
}
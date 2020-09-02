const rotas = {
    "lista_unidades" : `http://localhost:8080/v1/unidade/?usuarioId=`
};

class UnitService {
    constructor(){}

    static getUnits(cb, usuarioId){
        RequestLayout.GET(`${rotas.lista_unidades}${usuarioId}`, cb);
    }
}
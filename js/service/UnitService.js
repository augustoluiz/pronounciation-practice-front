const rotas = {
    "lista_unidades" : `https://pronounciation-practice.herokuapp.com/v1/unidade/?usuarioId=`,
    "nome_unidade": `https://pronounciation-practice.herokuapp.com/v1/unidade/nome/`
};

class UnitService {
    constructor(){}

    static getUnits(cb, usuarioId, token){
        RequestLayout.GET(`${rotas.lista_unidades}${usuarioId}`, cb, token);
    }

    static getUnitNameById(cb, unidadeId, token, usuarioId){
        RequestLayout.GET(`${rotas.nome_unidade}${unidadeId}?usuarioId=${usuarioId}`, cb, token, usuarioId)
    }
}
class UnitController{
    static addMenuList(cb, usuarioId, token){
        new UnitData().getDados((units) => {
            cb(UnitView.montaMenu(units))
        },  usuarioId, token, usuarioId);
    }
}
class UnitController{
    static addMenuList(cb, usuarioId){
        new UnitData().getDados((units) => {
            cb(UnitView.montaMenu(units))
        },  usuarioId);
    }
}
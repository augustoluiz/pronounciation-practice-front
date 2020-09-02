class UnitView {
    static montaMenu(listUnit){
        let listUnitHTML = listUnit.map(unit => {
            let html = `<a href="" id="idUnitMenu${unit.id}" onclick="escondeMenuMobile()">${unit.nome}`;
            if(unit.status > 0){
                html += `<div class="progress" style="height: 5px;">`+
                          `<div class="progress-bar" role="progressbar" aria-valuenow="${unit.status}" aria-valuemin="0" aria-valuemax="100" style="width:${unit.status}%;"></div>`+
                        `</div>`;
            }
            html += `</a>`;
            return html;
        });
        listUnitHTML.push(`<br/><p>© 2020 - Inglês Com Witte</p><br/>`);
        return listUnitHTML;
    }
}
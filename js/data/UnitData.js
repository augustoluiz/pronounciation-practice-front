let dataUnit = [{
    "id": 1,
    "nome": "Unit 1 - Introducing Yourself And Friends",
    "status": 10
}, {
    "id": 2,
    "nome": "Unit 2 - My Family And I",
    "status": 0
}, {
    "id": 3,
    "nome": "Unit 3 - What’s This? What Are These?",
    "status": 0
}, {
    "id": 4,
    "nome": "Unit 4 - Brazil Is A Wonderful Country",
    "status": 0
}, {
    "id": 5,
    "nome": "Unit 5 - Colors, Clothes And Numbers",
    "status": 0
}, {
    "id": 6,
    "nome": "Unit 6 - What Are You Doing?",
    "status": 0
}, {
    "id": 7,
    "nome": "Unit 7 - Do You Have .... ?",
    "status": 0
}, {
    "id": 8,
    "nome": "Unit 8 - Does He Speak ......... ?",
    "status": 0
}, {
    "id": 9,
    "nome": "Unit 9 - What Time Is It?",
    "status": 0
}, {
    "id": 10,
    "nome": "Unit 10 - Future And Conditional",
    "status": 0
}, {
    "id": 11,
    "nome": "Unit 11 - Interesting Conversation",
    "status": 0
}, {
    "id": 12,
    "nome": "Unit 12 - Everybody Needs Everybody",
    "status": 0
}, {
    "id": 13,
    "nome": "Unit 13 - Review, Consolidation, And Math",
    "status": 0
}, {
    "id": 14,
    "nome": "Unit 14 - TO BE (Past Tense)",
    "status": 0
}, {
    "id": 15,
    "nome": "Unit 15 - Yesterday I Studied ...",
    "status": 0
}, {
    "id": 16,
    "nome": "Unit 16 - Regular Verbs X Irregular Verbs",
    "status": 0
}, {
    "id": 17,
    "nome": "Unit 17 - Could, There Was / Were",
    "status": 0
}, {
    "id": 18,
    "nome": "Unit 18 - Useful Verbs And Expressions",
    "status": 0
}];

class UnitData {

    constructor() { }

    getDados(cb, usuarioId) {
        UnitService.getUnits(cb, usuarioId);
    }

    getNomeById(idUnit) {
        return dataUnit.filter(unit => unit.id == idUnit)[0].nome;
    }
}
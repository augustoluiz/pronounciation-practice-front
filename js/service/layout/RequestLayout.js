class RequestLayout{
    
    constructor(){}

    static GET(url, cb){
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("usuarioId", 1);
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let response = [];
                if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                }
                cb(response);
            }
        }
    }
}